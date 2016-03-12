import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { addRoom, fetchRooms } from '../actions/index';
import Header from '../components/common/header';
import Btn from '../components/common/btn';
import Room from '../components/room';

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
    const { name, user } = this.state;
    if (name === '') {
      return;
    }
    this.setState({
      name: '',
    });
    this.props.addRoom('egg', name)
      .payload.promise.then(() => {
        // TODO - need to add Room (in reducer)
        //this.props.navigator.push({ name: 'messenger' });
      });
  }

  renderRooms() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.rooms)}
        renderRow={(rowData) => <Room {...rowData} navigator={this.props.navigator} />}
      />
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

export default connect(mapStateToProps, { addRoom, fetchRooms })(Rooms);
