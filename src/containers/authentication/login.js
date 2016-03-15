import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { mixinExtend } from 'es2015-mixin';
import { login } from '../../actions/index';
import Btn from '../../components/common/btn';
import Logo from '../../components/common/logo';
import keyboardOffset from '../../mixins/keyboard-offset';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
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
              onChangeText={(email) => this.setState({ email })}
              placeholder={'Email'}
              style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
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

  onLoginPress() {
    const { email, password } = this.state;
    const errorCb = (errorMsg) => {
      this.setState({
        errorMsg,
      });
    };

    this.props.login(email, password)
      .payload.promise.then((response) => {
        if (!response.error) {
          this.props.navigator.immediatelyResetRouteStack([{ name: 'rooms' }]);
        } else {
          errorCb('Please check your network connection.');
        }
      }, () => errorCb('There has been a problem.'));
  }

  onSignUpPress() {
    this.props.navigator.push({ name: 'signup' });
  }
}

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
