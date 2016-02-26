import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} from 'react-native';
import Btn from './common/btn';
import Message from './message';

export default class Messenger extends Component {
  constructor(props) {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    super(props);
    this.state = {
      messages: [],
      dataSource,
    };
  }

  componentWillMount() {
  }

  onChangeText(message) {
    this.state.setState({
      message,
    });
  }

  _send() {
    // firebase
    this.setState({
      messages: [...this.state.messages, this.state.message],
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
        renderRow={(rowData) => <Message text={rowData} />}
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
          onChangeText={(message) => this.onChangeText(message))}
          onSubmitEditing={() => this._send()} />
        <Btn
          text={'send'}
          style={styles.sendBtn}
          onPress={() => this._send()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 45,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'yellow',
    marginBottom: 10,
  },
  headerText: {
    color: '#33A1C9',
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  inputContainer: {
    height: 50,
    borderTopWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    alignSelf: 'center',
    height: 48,
    width: 100,
    backgroundColor: '#FFF',
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: 14,
  },
  sendBtn: {
    marginTop: 10,
    marginLeft: 10,
  },
});
