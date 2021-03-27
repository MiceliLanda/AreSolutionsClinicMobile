import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const stack = createStackNavigator();
import Login from "./views/Login";
import Product from './views/Product'

function MyStack(){
  return(
    <stack.Navigator>
      <stack.Screen name="Login" component= { Login } />
      <stack.Screen name="Product" component= { Product } />
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
