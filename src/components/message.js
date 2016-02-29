import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';
const now = Date.now();

export default class Message extends Component {
  getDate() {
    const { date } = this.props;
    let momentified = moment(date);
    if (momentified.isSame(now, 'day')) {
      return momentified.fromNow();
    }

    return momentified.calendar();
  }

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
