import React, {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default ({ onBtnPress, btnText='<', text='Messenger' }) => {
  const backBtn = onBtnPress ? (
    <TouchableOpacity
      style={styles.btn}
      onPress={onBtnPress}>
      <Text style={[styles.headerText, styles.btnText]}>
        {btnText}
      </Text>
    </TouchableOpacity>
  ) : null;

  return (
    <View style={styles.headerContainer}>
      {backBtn}
      <Text style={[styles.titleText, styles.headerText]}>
        {text}
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
  btn: {
    alignItems: 'flex-start',
    height: 70,
    flexDirection: 'row',
  },
  btnText: {
    fontSize: 18,
  }
});
