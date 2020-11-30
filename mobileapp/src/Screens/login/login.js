import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <View style={{height: 100, width: 300, backgroundColor: 'yellow'}}>
      <TextInput
        style={{height: 100, width: 100}}
        label="Email"
        value={emailInput}
        onChangeText={(emailInput) => setText(emailInput)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('hello world')}>
        <Text>Press Here</Text>
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
