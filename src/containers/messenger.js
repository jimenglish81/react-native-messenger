import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import { addMessage, addChat } from '../actions/index';
import Btn from '../components/common/btn';
import Message from '../components/message';

class Messenger extends Component {
  constructor(props) {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    super(props);
    this.state = {
      messages: [],
      dataSource,
    };
  }

  componentWillMount() {
    // this.props.addChat(this.props.user.uid, 'egg');
  }

  onChangeText(message) {
    this.setState({
      message,
    });
  }

  _send() {
    // firebase
    let { message, messages } = this.state;
    this.setState({
      messages: [...messages, { message, date: new Date() }],
      message: '',
    });
  }

  render() {
    return (
      <View
        style={styles.container}>
        {this.renderHeader()}
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
        dataSource={this.state.dataSource.cloneWithRows(this.state.messages)}
        renderRow={(rowData) => <Message {...rowData} />}
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
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#1c86ee',
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
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

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { addMessage, addChat })(Messenger);
