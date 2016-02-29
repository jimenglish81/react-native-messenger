import React, {
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addMessage } from '../actions';
import Login from './authentication/login';
import SignUp from './authentication/signup';
import Messenger from './messenger';

export const ROUTES = {
  login: Login,
  signup: SignUp,
  messenger: Messenger,
};

class App extends Component {
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
        initialRoute={{ name: 'login' }}
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

function mapStateToProps(state) {
  return {
    message: state.myMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
