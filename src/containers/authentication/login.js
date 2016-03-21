import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  Animated,
  PropTypes
} from 'react-native';
import { connect } from 'react-redux';
import { mixinExtend } from 'es2015-mixin';
import { login } from '../../actions/index';
import Btn from '../../components/common/btn';
import Logo from '../../components/common/logo';
import keyboardOffset from '../../mixins/keyboard-offset';

const INITIAL_STATE = {
  email: '',
  password: '',
  errorMsg: '',
  isSubmitting: false,
};

class Login extends Component {
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
        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.email}
              onChangeText={(value) => this.setState({ email: value.trim() })}
              placeholder={'Email'}
              style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.password}
              onChangeText={(value) => this.setState({ password: value.trim()  })}
              secureTextEntry={true}
              placeholder={'Password'}
              style={styles.input} />
          </View>
          <TouchableHighlight
            style={styles.signup}
            underlayColor={'transparent'}
            onPress={() => this.onSignUpPress()}>
            <Text style={styles.signupText}>
              {'Don\'t have an account? sign up'}
            </Text>
          </TouchableHighlight>
          <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
          <View style={styles.btnContainer}>
            <Btn text={'Login'} onPress={() => this.onLoginPress()} />
          </View>
        </View>
      </Animated.View>
    );
  }

  login(email, password) {
    this.props.login(email, password)
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

  onLoginPress() {
    const { email, password, isSubmitting } = this.state;
    if (email === '' ||
        password === '' ||
        isSubmitting) {
      return;
    }

    this.setState({
      isSubmitting: true,
    });

    this.login(email, password);
  }

  onSignUpPress() {
    this.setState({
      ...INITIAL_STATE
    });
    this.props.navigator.push({ name: 'signup' });
  }
}

Login.propTypes = {
  navigator: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
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
  loginContainer: {
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
  signup: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 5,
  },
  signupText: {
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

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { login })(mixinExtend(Login, keyboardOffset));
