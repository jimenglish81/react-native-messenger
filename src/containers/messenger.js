import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { mixinExtend } from 'es2015-mixin';
import { addMessage, fetchMessages } from '../actions/index';
import Btn from '../components/common/btn';
import Header from '../components/common/header';
import Message from '../components/message';
import { THEMES } from '../utils/message-themes';
import keyboardOffset from '../mixins/keyboard-offset';

const availableThemes = Object.keys(THEMES).filter((theme) => theme !== 'GREY');

class Messenger extends Component {
  constructor(props) {
    const rowChange = { rowHasChanged: (r1, r2) => r1 !== r2 };
    const dataSource = new ListView.DataSource(rowChange);

    super(props);
    this.state = {
      message: '',
      dataSource,
      themes: {},
    };
  }

  componentWillMount() {
    this.props.fetchMessages(this.props.roomId);
  }

  componentWillReceiveProps(props) {
    const themes = { ...this.state.themes };
    const { uid } = this.props.user;
    const users = props.messages.reduce((users, { userId }) => {
      if (!users.includes(userId)) {
        users.push(userId);
      }
      return users;
    }, []);

    let themeIndex = 0;
    for (let i = 0, l = users.length; i < l; i++) {
      let userId = users[i];
      if (themes[userId]) {
        continue;
      }
      if (userId === uid) {
        themes[userId] = 'GREY';
      } else {
        themes[userId] = availableThemes[themeIndex % availableThemes.length];
        themeIndex++;
      }
    }

    this.setState({
      themes,
    });
  }

  onChangeText(message) {
    this.setState({
      message,
    });
  }

  _sendMessage() {
    let { message } = this.state;
    const { user, roomId } = this.props;
    if (message.trim() === '') {
      return;
    }
    this.setState({
      message: '',
    });
    this.props.addMessage(user, roomId, message);
    this._input.blur();
  }

  renderMessage(message) {
    const isOwnMessage = (message.userId === this.props.user.uid);
    const alignment = isOwnMessage ? 'right' : 'left';
    const theme = this.state.themes[message.userId];

    return (
      <Message {...message} alignment={alignment} theme={THEMES[theme]} />
    );
  }

  renderMessages() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.messages)}
        renderRow={(rowData) => this.renderMessage(rowData)} />
    );
  }

  renderInput() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add message..."
          style={styles.input}
          value={this.state.message}
          ref={(input) => this._input = input}
          onChangeText={(message) => this.onChangeText(message)}
          onSubmitEditing={() => this._sendMessage()} />
        <View style={styles.btnContainer}>
          <Btn
            text={'send'}
            onPress={() => this._sendMessage()} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, { marginBottom: this.state.keyboardOffset }]}>
        <Header
          text={this.props.currentRoom.name}
          onBtnPress={() => this.props.navigator.pop()} />
        {this.renderMessages()}
        {this.renderInput()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  inputContainer: {
    height: 50,
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    alignSelf: 'center',
    height: 48,
    width: 100,
    backgroundColor: '#fff',
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: 14,
  },
  btnContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
});

function mapStateToProps({ user, messages, currentRoom }) {
  return {
    user,
    messages,
    currentRoom,
  };
}

export default connect(mapStateToProps,
        { addMessage, fetchMessages })(mixinExtend(Messenger, keyboardOffset));
