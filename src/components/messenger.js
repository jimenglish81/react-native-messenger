import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} from 'react-native';
import Btn from './common/btn';

export default class Messenger extends Component {
  constructor(props) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props);
    this.state = {
      messages: [],
      dataSource: ds,
    };
  }

  componentWillMount() {
  }

  _send() {
    // firebase
    this.setState({
      messages: [...this.state.messages, this.state.message],
    });
  }

  render() {
    return (
      <View
        style={styles.container}>
        {this.renderMessages()}
        {this.renderInput()}
      </View>
    );
  }

  renderMessages() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.state.messages)}
        renderRow={(rowData) => <Text>{rowData}</Text>}
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
          onChangeText={(message) => this.setState({ message })}
          onSubmitEditing={() => this._send()} />
        <Btn
          text={'Send'}
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
  inputContainer: {
    height: 44,
    borderTopWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    alignSelf: 'center',
    height: 40,
    width: 100,
    backgroundColor: '#FFF',
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: 15,
  },
  sendBtn: {
    marginTop: 10,
    marginLeft: 10,
  },
  listView: {
    flex: 1,
  },
});
