import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { formatDate } from '../utils/date';

export const THEMES = {
  BLUE_SLATE: {
    backgroundColor: '#c6e2ff',
    color: '#000',
  },
  GREY: {
    backgroundColor: '#e6e6eb',
    color: '#000',
  },
};

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: formatDate(props.time),
    };
  }

  componentWillMount() {
    this._tick();
  }

  _tick() {
    this.setState({
      time: formatDate(this.props.time),
    });
    this._timeout = window.setTimeout(() => this._tick(), 5000);
  }

  render() {
    const {
      alignment='right',
      theme=THEMES.GREY,
      message,
    } = this.props;
    const { backgroundColor, color } = theme;
    const alignStyle = {
      alignItems: alignment === 'left' ? 'flex-start' : 'flex-end',
    };
    const messageStyle = {
      backgroundColor,
    };
    const messageTextStyle = {
      color,
    };
    return (
      <View style={[styles.messageContainer, styles[alignment]]}>
        <View style={[styles.timeContainer, alignStyle]}>
          <Text style={styles.timeText}>{this.state.time}</Text>
        </View>
        <View style={[styles.message, alignStyle, messageStyle]}>
          <Text style={[styles.messageText, messageTextStyle]}>
            {message}
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
   },
   messageText: {
     fontSize: 14,
   },
   left: {
     marginRight: 70,
   },
   right: {
     marginLeft: 70,
   },
   timeContainer: {
     justifyContent: 'center',
     padding: 5,
   },
   timeText: {
     color: '#ccc',
     fontSize: 12,
   },
});
