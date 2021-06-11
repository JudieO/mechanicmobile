import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Order from './components/order';
import Signup from './components/signup';
import Login from './components/login';
import showMap from './components/home';
import requestMechanic from './components/requestMechanic';

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
        <Stack.Screen name="Map" component={showMap} />
        
        <Stack.Screen name="Order" component={Order} />
        {/* <Stack.Screen name="Map" component={showMap} /> */}
        <Stack.Screen name="requestMechanic" component={requestMechanic} />

      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App;