import React, {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default () => {
  return (
    <Image style={styles.logo} source={require('../img/person.png')} />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100
  },
});
