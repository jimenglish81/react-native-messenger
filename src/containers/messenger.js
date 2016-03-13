import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import { addMessage, fetchMessages } from '../actions/index';
import Btn from '../components/common/btn';
import Header from '../components/common/header';
import Message from '../components/message';
import { THEMES } from '../utils/message-themes';

const availableThemes = Object.keys(THEMES).filter((theme) => theme !== 'GREY');

class Messenger extends Component {
  constructor(props) {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
    })
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
        renderRow={(rowData) => this.renderMessage(rowData)}
      />
    );
  }

  renderInput() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add message..."
          style={styles.input}
          value={this.state.message}
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
      <View
        style={styles.container}>
        <Header onBackPress={() => this.props.navigator.pop()} />
        {this.renderMessages()}
        {this.renderInput()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    height: 50,
    borderTopWidth: 1,
    borderColor: '#CCC',
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

function mapStateToProps({ user, messages }) {
  return {
    user,
    messages,
  };
}

export default connect(mapStateToProps, { addMessage, fetchMessages })(Messenger);
