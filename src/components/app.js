import React, {
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';
import Login from '../containers/authentication/login';
import SignUp from '../containers/authentication/signup';
import Messenger from '../containers/messenger';
import Rooms from '../containers/rooms';

export const ROUTES = {
  login: Login,
  signup: SignUp,
  messenger: Messenger,
  rooms: Rooms,
};

export default class App extends Component {
  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return (
      <Component navigator={navigator} route={route} {...route.config} />
    );
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'rooms' }}
        renderScene={(...args) => this.renderScene(...args)}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
