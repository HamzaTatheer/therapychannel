import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import Login from './Screens/login/login';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App = () => {
  console.log('hello');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <PaperProvider theme={theme}>
          <Login />
        </PaperProvider>
      </SafeAreaView>
    </>
  );
};

export default App;
