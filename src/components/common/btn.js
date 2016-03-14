import React, {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default ({ onPress, text }) => {
  return (
    <TouchableHighlight
      style={styles.btn}
      underlayColor={'#ccc'}
      onPress={onPress}>
      <Text style={styles.btnText}>
        {text}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1c86ee',
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
