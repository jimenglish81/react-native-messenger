import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export default class Room extends Component {
  constructor(props) {
    super(props);
  }

  _onPress() {
    this.props.navigator.push({
      name: 'messenger',
      config: {
        roomId: this.props.roomId,
      },
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this._onPress()}
        style={styles.room}>
        <Text style={styles.roomText}>
          {this.props.name}
        </Text>
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
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  roomText: {
    color: '#000',
  },
});
