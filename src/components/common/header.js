import React, {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default ({ onBackPress }) => {
  const backBtn = onBackPress ? (
    <TouchableOpacity
      style={styles.backBtn}
      onPress={onBackPress}>
      <Text style={[styles.headerText, styles.backBtnText]}>
        {'<'}
      </Text>
    </TouchableOpacity>
  ) : null;

  return (
    <View style={styles.headerContainer}>
      {backBtn}
      <Text style={[styles.titleText, styles.headerText]}>
        Messenger
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#1c86ee',
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  titleText: {
    textAlign: 'center',
  },
  backBtn: {
    alignItems: 'flex-start',
    height: 70,
    flexDirection: 'row',
  },
  backBtnText: {
    fontSize: 18,
  }
});
