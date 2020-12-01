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
import configureStore from './store/configureStore';
import Login from './screens/login/login';
import { Provider } from 'react-redux';

const store = configureStore();

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
      <SafeAreaView style={{flex:1}}>
        <PaperProvider theme={theme}>
          <Provider store={store}>
          <Login />
          </Provider>
        </PaperProvider>
      </SafeAreaView>
    </>
  );
};

export default App;
