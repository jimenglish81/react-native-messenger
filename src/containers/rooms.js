import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { addRoom, enterRoom, fetchRooms, removeRoom } from '../actions/index';
import Header from '../components/common/header';
import Btn from '../components/common/btn';
import Room from '../components/room';

const deleteBtn = {
  text: 'Delete',
  backgroundColor: 'red',
  underlayColor: 'rgba(1, 0, 0, 0.6)',
};

class Rooms extends Component {
  constructor(props) {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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

  _addRoom() {
    const { name } = this.state;
    if (name === '') {
      return;
    }
    this.setState({
      name: '',
    });
    this.props.addRoom(this.props.user.uid, name);
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
          navigator={this.props.navigator}
          onPress={(roomId) => this.props.enterRoom(roomId)} />
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
          onChangeText={(name) => this.onChangeText(name)}
          onSubmitEditing={() => this._addRoom()} />
        <View style={styles.btnContainer}>
          <Btn
            text={'+'}
            onPress={() => this._addRoom()} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Header />
        {this.renderRooms()}
        {this.renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    height: 50,
    borderTopWidth: 1,
    borderColor: '#CCC',
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

export default connect(mapStateToProps, { addRoom, enterRoom, fetchRooms, removeRoom })(Rooms);
