import {
  Animated,
  DeviceEventEmitter
} from 'react-native';

const FRICTION = 6;

export default {
  keyboardWillShow(evt) {
    Animated.spring(this.state.keyboardOffset, {
      toValue: evt.endCoordinates.height,
      friction: FRICTION,
    }).start();

    Animated.spring(this.state.screenOffset, {
      toValue: evt.endCoordinates.screenY,
      friction: FRICTION,
    }).start();
  },

  keyboardWillHide() {
    Animated.spring(this.state.keyboardOffset, {
     toValue: 0,
     friction: FRICTION,
   }).start();

   Animated.spring(this.state.screenOffset, {
    toValue: 0,
    friction: FRICTION,
  }).start();
  },

  componentWillMount() {
    const state = this.state;
    state.keyboardOffset = new Animated.Value(0);
    state.screenOffset = new Animated.Value(0);
  },

  componentDidMount() {
    this._keyboardWillShow = DeviceEventEmitter.addListener('keyboardWillShow', (evt) => this.keyboardWillShow(evt));
    this._keyboardWillHide = DeviceEventEmitter.addListener('keyboardWillHide', (evt) => this.keyboardWillHide(evt));
  },

  componentWillUnmount() {
    this._keyboardWillShow.remove();
    this._keyboardWillHide.remove();
  },
};
