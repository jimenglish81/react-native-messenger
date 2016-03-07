import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { formatDate } from '../utils/date';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: formatDate(props.date),
    };
  }

  componentWillMount() {
    this._tick();
  }

  _tick() {
    this.setState({
      time: formatDate(this.props.date),
    });
    this._timeout = window.setTimeout(() => this._tick(), 5000);
  }

  render() {
    return (
      <View style={styles.messageContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{this.state.time}</Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.messageText}>
            {this.props.message}
          </Text>
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    window.clearTimeout(this._timeout);
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  message: {
     borderRadius: 15,
     paddingLeft: 15,
     paddingRight: 15,
     paddingBottom: 10,
     paddingTop: 10,
     backgroundColor: '#E6E6EB',
   },
   messageText: {
     color: '#000',
     fontSize: 14,
   },
   timeContainer: {
     justifyContent: 'center',
     alignItems: 'flex-end',
     padding: 5,
   },
   timeText: {
     color: '#ccc',
     fontSize: 12,
   },
});
