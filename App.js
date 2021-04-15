import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const stack = createStackNavigator();
import Login from "./views/Login";
import Product from './views/Product'
import Carrito from './views/Carrito';
import Menu from './views/Menu';
import TabScreen from './views/TabScreen';

function MyStack() {
  return (
    <stack.Navigator >
      <stack.Screen name="Login" component={Login} options={{
        title: 'Inicio', headerStyle: {
          backgroundColor: '#CCF5F6',
        }, headerTintColor: '#560086',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center'
        }/* , headerTitle: <LogoTitle /> */
      }} />
      {/*       <stack.Screen name="Menu" component={Menu} options={{ title: 'Menu de Inicio' }} />
      <stack.Screen name="Product" component={Product} options={{ title: 'Tienda' }} />
      <stack.Screen name="Carrito" component={Carrito} options={{ title: 'Carrito' }} /> */}
      <stack.Screen name="Menu" component={TabScreen} />
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
