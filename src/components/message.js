import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Message extends Component {
  render() {
    return (
      <View style={styles.bubble}>
        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bubble: {
     borderRadius: 15,
     paddingLeft: 15,
     paddingRight: 15,
     paddingBottom: 10,
     paddingTop: 10,
     backgroundColor: '#E6E6EB',
     marginBottom: 10,
   },
   text: {
     color: '#000',
   },
});
