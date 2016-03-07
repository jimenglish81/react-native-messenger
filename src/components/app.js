import React, {
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';
import Login from '../containers/authentication/login';
import SignUp from '../containers/authentication/signup';
import Messenger from '../containers/messenger';

export const ROUTES = {
  login: Login,
  signup: SignUp,
  messenger: Messenger,
};

export default class App extends Component {
  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return (
      <Component navigator={navigator} route={route} />
    );
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'messenger' }}
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
