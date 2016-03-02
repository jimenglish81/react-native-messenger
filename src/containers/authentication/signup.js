import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../../actions/index';
import Btn from '../../components/common/btn';

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
        <Text>
          Sign up
        </Text>
        <Text style={styles.label}>
          Email:
        </Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          style={styles.input} />
        <Text style={styles.label}>
          Password:
        </Text>
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
          style={styles.input} />
        <Text style={styles.label}>
          Password Confirmation:
        </Text>
        <TextInput
          value={this.state.passwordConfirmation}
          onChangeText={(passwordConfirmation) => this.setState({ passwordConfirmation })}
          secureTextEntry={true}
          style={styles.input} />
        <Text style={styles.label}>{this.state.errorMsg}</Text>
        <Btn text={'Sign Up'} onPress={() => this.onSignUpPress()} />
        <Btn text={'I have an account...'} onPress={() => this.onLoginPress()} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 18,
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center',
  },
});

export default connect(null, { signUp })(SignUp);
