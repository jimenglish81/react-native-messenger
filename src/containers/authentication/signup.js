import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../../actions/index';
import Btn from '../../components/common/btn';
import Logo from '../../components/logo';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMsg: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.signupContainer}>
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
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.passwordConfirmation}
              onChangeText={(passwordConfirmation) => this.setState({ passwordConfirmation })}
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
      </View>
    );
  }

  onSignUpPress() {
    const { email, password, passwordConfirmation } = this.state;

    if (password !== passwordConfirmation) {
      return this.setState({
        password: '',
        passwordConfirmation: '',
        errorMsg: 'Your passwords do not match.',
      });
    } else {
      this.props.signUp(email, password)
        .payload.promise.then(() => {
          this.props.navigator.immediatelyResetRouteStack([{ name: 'messenger' }]);
        }, (err) => {
          this.setState({
            errorMsg: 'There has been a problem.',
          });
        });
    }
  }

  onLoginPress() {
    this.props.navigator.pop();
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

export default connect(null, { signUp })(SignUp);
