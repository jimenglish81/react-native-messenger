import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import Btn from '../components/common/btn';
import Message from '../components/message';

class Room extends Component {
  constructor(props) {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    super(props);
    this.state = {
      rooms: [],
      dataSource,
    };
  }

}
