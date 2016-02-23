import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class Btn extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.btn}
        underlayColor={'gray'}
        onPress={this.props.onPress}>
        <Text style={styles.btnText}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    marginTop: 5,
  },
  btnText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
  },
});
