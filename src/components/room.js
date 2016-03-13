import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { formatRoomDate } from '../utils/date';

export default class Room extends Component {
  constructor(props) {
    super(props);
  }

  _onPress() {
    const { roomId } = this.props;
    this.props.onPress(roomId);
    this.props.navigator.push({
      name: 'messenger',
      config: {
        roomId,
      },
    });
  }

  render() {
    const { name, date } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this._onPress()}
        style={styles.room}>
        <View style={styles.roomTextContainer}>
          <Text style={styles.roomText}>
            {name}
          </Text>
        </View>
        <View style={styles.roomDateContainer}>
          <Text style={styles.roomDateText}>
            {formatRoomDate(date)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  room: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  roomTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  roomText: {
    color: '#000',
    fontSize: 16,
  },
  roomDateContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  roomDateText: {
    color: '#ccc',
    fontSize: 12,
  },
});
