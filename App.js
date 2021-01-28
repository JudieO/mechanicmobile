import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Order from './components/order';
import Signup from './components/signup';
import Login from './components/login';

// Remember to add <Order/> later

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >

        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="Order" component={Order} />

      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App;