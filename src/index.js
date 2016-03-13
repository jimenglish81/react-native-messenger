import React, {
  Component
} from 'react-native';
import { Provider } from 'react-redux/native';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware(),
  thunk
)(createStore);

export default class Main extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        {() => <App />}
      </Provider>
    );
  }
}
