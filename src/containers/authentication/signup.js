import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Animated,
  PropTypes
} from 'react-native';
import { connect } from 'react-redux';
import { mixinExtend } from 'es2015-mixin';
import { signUp } from '../../actions/index';
import Btn from '../../components/common/btn';
import Logo from '../../components/common/logo';
import keyboardOffset from '../../mixins/keyboard-offset';
import { validateEmail, validatePassword } from '../../utils/validation';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirmation: '',
  errorMsg: '',
  isSubmitting: false,
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  render() {
    return (
      <Animated.View style={[styles.container, { marginBottom: this.state.screenOffset }]}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.signupContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={(node) => this._email = node}
              value={this.state.email}
              onChangeText={(value) => this.setState({ email: value.trim() })}
              placeholder={'Email'}
              style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={(node) => this._password = node}
              value={this.state.password}
              onChangeText={(value) => this.setState({ password: value.trim() })}
              secureTextEntry={true}
              placeholder={'Password'}
              style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={(node) => this._passwordConfirmation = node}
              value={this.state.passwordConfirmation}
              onChangeText={(value) => this.setState({ passwordConfirmation: value.trim() })}
              secureTextEntry={true}
              placeholder={'Password Confirmation'}
              style={styles.input} />
          </View>
          <TouchableHighlight
            style={styles.login}
            underlayColor={'transparent'}
            onPress={() => this.onLoginPress()}>
            <Text style={styles.loginText}>
              {'Back to login'}
            </Text>
          </TouchableHighlight>
          <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
          <View style={styles.btnContainer}>
            <Btn text={'Sign Up'} onPress={() => this.onSignUpPress()} />
          </View>
        </View>
      </Animated.View>
    );
  }

  signuo() {
    this.props.signUp(email, password)
      .payload.promise.then((response) => {
        if (!response.error) {
          this.props.navigator.immediatelyResetRouteStack([{ name: 'rooms' }]);
        } else {
          this.onError(response.payload.message);
        }
      }, () => this.onError('There has been a problem.'));
  }

  onError(errorMsg) {
    this.setState({
      errorMsg,
      isSubmitting: false,
    });
  }

  onSignUpPress() {
    const {
        email,
        password,
        passwordConfirmation,
        isSubmitting
      } = this.state;

    if (email === '' ||
        password === '' ||
        passwordConfirmation === '' ||
        isSubmitting) {
      return;
    }

    if (!validateEmail(email)) {
      this.setState({
        email: '',
        password: '',
        passwordConfirmation: '',
        errorMsg: 'Your email is not valid.',
      });
      this._email.focus();
    } else if (!validatePassword(password)) {
      this.setState({
        password: '',
        passwordConfirmation: '',
        errorMsg: 'Your password must be between 6-8 characters and contain letters and numbers.',
      });
      this._password.focus();
    } else if (password !== passwordConfirmation) {
      this.setState({
        password: '',
        passwordConfirmation: '',
        errorMsg: 'Your passwords do not match.',
      });
      this._password.focus();
    } else {
      this.setState({
        isSubmitting: true,
      });
      this.signup(email, password, passwordConfirmation);
    }
  }

  onLoginPress() {
    this.setState({
      ...INITIAL_STATE,
    });
    this.props.navigator.pop();
  }
}

SignUp.propTypes = {
  navigator: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  logoContainer: {
    flex: 2.5,
    backgroundColor: '#1c86ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    flex: 1.5,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40,
  },
  input: {
    position: 'absolute',
    left: 20,
    top: 10,
    right: 20,
    height: 20,
    fontSize: 14,
  },
  login: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 5,
  },
  loginText: {
    color: '#ccc',
  },
  btnContainer: {
    marginTop: 10,
  },
  errorMsg: {
    fontSize: 14,
    color: '#ff3232',
  },
});

export default connect(null, { signUp })(mixinExtend(SignUp, keyboardOffset));
