import 'react-native-gesture-handler';
import * as React from 'react';
import Home from './client/components/Home.js';
import Login from './client/components/Login.js';
import Signup from './client/components/Signup.js'
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const App = () => { 
  return (
    <NavigationContainer >
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name= "Login" component={ Login } />
        <Stack.Screen name= "Signup" component={ Signup } />
        <Stack.Screen name= "Home" component={ Home } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
