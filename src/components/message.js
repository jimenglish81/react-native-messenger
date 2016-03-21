import React, {
  Component,
  StyleSheet,
  Text,
  View,
  PropTypes
} from 'react-native';
import { formatMessageTime } from '../utils/date';
import { THEMES } from '../utils/message-themes';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: formatMessageTime(props.time),
    };
  }

  componentWillMount() {
    this._tick();
  }

  _tick() {
    this.setState({
      time: formatMessageTime(this.props.time),
    });
    this._timeout = window.setTimeout(() => this._tick(), 5000);
  }

  render() {
    const {
      alignment='right',
      theme=THEMES.GREY,
      message,
      email,
    } = this.props;
    const { backgroundColor, color, highlightColor } = theme;
    const alignStyle = {
      alignItems: alignment === 'left' ? 'flex-start' : 'flex-end',
    };
    const messageStyle = {
      backgroundColor,
    };
    const messageTextStyle = {
      color,
    };
    const userTheme = {
      color: highlightColor,
    };

    return (
      <View style={[styles.messageContainer, styles[alignment]]}>
        <View style={[styles.timeContainer, alignStyle]}>
          <Text style={styles.timeText}>{this.state.time}</Text>
        </View>
        <View style={[styles.message, alignStyle, messageStyle]}>
          <View>
            <Text style={[styles.userText, userTheme]}>{email}</Text>
          </View>
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

Message.propTypes = {
  alignment: PropTypes.string,
  theme: PropTypes.object,
  message: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  messageContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  message: {
     borderRadius: 25,
     paddingLeft: 15,
     paddingRight: 15,
     paddingBottom: 10,
     paddingTop: 10,
   },
   userText: {
     fontSize: 12,
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
