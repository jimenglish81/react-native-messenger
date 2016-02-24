import React, {
  AppRegistry,
  Component
} from 'react-native';
import { Provider } from 'react-redux/native';
import { createStore } from 'redux';
import reducers from './src/reducers';
import App from './src/containers/app';

const store = createStore(reducers);

class Other extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('reactNativeMessenger', () => Other);
