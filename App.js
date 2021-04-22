import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const stack = createStackNavigator();

import Login from "./views/Login";
import TabScreen from './views/TabScreen';

function MyStack() {
  return (
    <stack.Navigator>
      <stack.Screen name="Login" component={Login} options={{
        title: 'Inicio', headerStyle: {
          backgroundColor: '#11698E',
        }, headerTintColor: '#F1F1F1',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
        }
      }} />
      <stack.Screen name="Menu" component={TabScreen} options={{
        title: 'AreSolutionsClinic',
        headerStyle: {
          backgroundColor: '#11698E',
        }, headerTintColor: '#F1F1F1',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'justify',
        },
      }} />
    </stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
