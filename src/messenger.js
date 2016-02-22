import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Messenger extends Component {
  constructor(props) {
    this.super(props);
    this.state = {
      messages: [],
    };
  }

  render() {
    return (
      <View
        style={styles.container}>
        {this.renderInput()}
      </View>
    )
  }

  renderInput() {
    return (
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: (
    flex: 2,
  ),
  input: {
    alignSelf: 'center',
  },
})
