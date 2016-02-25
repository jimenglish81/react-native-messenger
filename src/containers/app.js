import React, {
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addMessage } from '../actions';
import Messenger from '../components/messenger';

export const ROUTES = {
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
        configureScene={() => Navigator.SceneConfigs.FloatFromRight }
        />
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.myMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
