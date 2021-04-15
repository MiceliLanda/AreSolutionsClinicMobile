import React from 'react';
import Menu from './Menu';
import Product from './Product';
import Carrito from './Carrito';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';

const Tab = createMaterialBottomTabNavigator();

const TabScreen = (props) => {

    const token = props.route.params.token
    const idProducto = null

    return (
        <Tab.Navigator
            initialRouteName="Menu"
            activeColor="#e91e63"
            barStyle={{ backgroundColor: 'tomato' }}
        >
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tienda"
                initialParams={{ token }}
                component={Product}
                options={{
                    tabBarLabel: 'Tienda Online',
                    tabBarIcon: ({ color }) => (
                        <Icon name="menu" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Carrito"
                initialParams={{ idProducto, token }}
                component={Carrito}
                options={{
                    tabBarLabel: 'Carrito',
                    tabBarIcon: ({ color }) => (
                        <Icon name="layers" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabScreen