import React, {
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';
import Messenger from './components/messenger';

export const ROUTES = {
  messenger: Messenger,
};

export default class Main extends Component {
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
        configureScene={() => Navigator.SceneConfigs.FloatFromRight }
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
