import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



const stack = createStackNavigator();
import loginView from "./views/Login";

function MyStack(){
  return(
    <stack.Navigator>
      <stack.Screen name="Login" component= { loginView } />
    </stack.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>

  );
}
