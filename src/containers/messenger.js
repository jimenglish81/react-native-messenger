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

class Messenger extends Component {
  constructor(props) {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    super(props);
    this.state = {
      dataSource,
    };
  }

  componentWillMount() {
    this.props.fetchMessages(this.props.roomId);
  }

  onChangeText(message) {
    this.setState({
      message,
    });
  }

  _send() {
    // firebase
    let { message } = this.state;
    const { user, roomId } = this.props;
    if (message === '') {
      return;
    }
    this.setState({
      message: '',
    });

    this.props.addMessage(user.userId, roomId, message);
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Header />
        {this.renderMessages()}
        {this.renderInput()}
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Messenger
        </Text>
      </View>
    );
  }

  renderMessages() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.messages)}
        renderRow={(rowData, sectionId, rowId) => <Message {...rowData} alignment={rowId % 2 ? 'left' : 'right'} />}
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
          onSubmitEditing={() => this._send()} />
        <View style={styles.btnContainer}>
          <Btn
            text={'send'}
            onPress={() => this._send()} />
        </View>
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
