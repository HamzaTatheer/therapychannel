import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <View style={{height: 100, backgroundColor: 'yellow'}}>
      <TextInput
        style={{height: 100}}
        label="Email"
        value={emailInput}
        onChangeText={(emailInput) => setEmailInput(emailInput)}
      />
      <TextInput
        style={{height: 100}}
        label="Password"
        value={passwordInput}
        onChangeText={(passwordInput) => setPasswordInput(passwordInput)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('hello world')}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('hello world')}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default Login;
