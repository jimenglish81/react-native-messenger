import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../actions';
import Btn from '../../components/common/btn';

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
      <View style={styles.container}>
        <Text>
          Sign in.
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
        <Text style={styles.label}>{this.state.errorMsg}</Text>
        <Btn text={'Login'} onPress={() => this.onLoginPress()} />
        <Btn text={'I need an account...'} onPress={() => this.onSignUpPress()} />
      </View>
    );
  }

  onLoginPress() {
    const { email, password } = this.state;
    this.props.login(email, password)
      .promise.then(() => {
        this.props.navigator.immediatelyResetRouteStack([{ name: 'messenger' }]);
      }, (err) => {
        this.setState({
          errorMsg: 'There has been a problem.',
        });
      });
  }

  onSignUpPress() {
    this.props.navigator.push({ name: 'signup' });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  label: {
    fontSize: 18,
  },
});

export default connect(null, { login })(Login);
