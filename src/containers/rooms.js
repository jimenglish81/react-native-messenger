import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  TextInput,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { mixinExtend } from 'es2015-mixin';
import Swipeout from 'react-native-swipeout';
import {
  addRoom,
  enterRoom,
  fetchRooms,
  removeRoom
} from '../actions/index';
import Header from '../components/common/header';
import Btn from '../components/common/btn';
import Room from '../components/room';
import keyboardOffset from '../mixins/keyboard-offset';

const deleteBtn = {
  text: 'Delete',
  backgroundColor: '#ff0000',
  underlayColor: 'rgba(1, 0, 0, 0.6)',
};

class Rooms extends Component {
  constructor(props) {
    const rowChange = { rowHasChanged: (r1, r2) => r1 !== r2 };
    const dataSource = new ListView.DataSource(rowChange);

    super(props);
    this.state = {
      name: '',
      dataSource,
    };
  }

  componentWillMount() {
    this.props.fetchRooms();
  }

  onChangeText(name) {
    this.setState({
      name,
    });
  }

  onRoomPress(roomId) {
    this.props.enterRoom(roomId);
    this.props.navigator.push({
      name: 'messenger',
      config: {
        roomId,
      },
    });
  }

  addRoom() {
    const { name } = this.state;

    if (name === '') {
      return;
    }
    this.setState({
      name: '',
    });
    this.props.addRoom(this.props.user.uid, name);
    this._input.blur();
  }

  renderRoom(room) {
    const { roomId, userId } = room;
    const ownsRoom = this.props.user.uid === userId;
    const btns = ownsRoom ? [
        {
          ...deleteBtn,
          onPress: () => this.props.removeRoom(room.roomId),
        },
      ] : [];

    return (
      <Swipeout right={btns}
        autoClose='true'
        backgroundColor= 'transparent'>
        <Room {...room}
          onPress={(roomId) => this.onRoomPress(roomId)} />
      </Swipeout>
    );
  }

  renderRooms() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.rooms)}
        renderRow={(rowData) => this.renderRoom(rowData)} />
    );
  }

  renderFooter() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add room..."
          style={styles.input}
          value={this.state.name}
          ref={(input) => this._input = input}
          onChangeText={(name) => this.onChangeText(name)}
          onSubmitEditing={() => this.addRoom()} />
        <View style={styles.btnContainer}>
          <Btn
            text={'+'}
            onPress={() => this.addRoom()} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, { marginBottom: this.state.keyboardOffset }]}>
        <Header />
        {this.renderRooms()}
        {this.renderFooter()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  inputContainer: {
    height: 50,
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    alignSelf: 'center',
    height: 48,
    width: 100,
    backgroundColor: '#fff',
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: 14,
  },
  btnContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
});

function mapStateToProps({ user, rooms }) {
  return { user, rooms };
}

export default connect(mapStateToProps,
        { addRoom, enterRoom, fetchRooms, removeRoom })(mixinExtend(Rooms, keyboardOffset));
