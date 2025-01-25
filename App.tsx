import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/authScreen/Login';
import Register from './src/screens/authScreen/Register';
import CreateGoalScreen from './src/screens/CreateGoalScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Stack Navigator for login and registration
const Stack = createStackNavigator();

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// AppNavigator: Manages all screen navigation
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Create Goal" component={CreateGoalScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
