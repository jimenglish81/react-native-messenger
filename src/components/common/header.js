import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Messenger
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
