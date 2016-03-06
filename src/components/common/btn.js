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
        underlayColor={'#CCC'}
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
    backgroundColor: '#1C86EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderColor: '#fff',
  },
  btnText: {
    alignSelf: 'center',
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
});
