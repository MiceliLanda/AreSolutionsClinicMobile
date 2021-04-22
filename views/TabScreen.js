import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';

import React from 'react';
import Menu from './Menu';
import Product from './Product';
import Carrito from './Carrito';

const Tab = createMaterialBottomTabNavigator();

const TabScreen = (props) => {

    const token = props.route.params.token
    const idProducto = null

    return (
        <Tab.Navigator
            initialRouteName="Tienda"
            activeColor="#F1F1F1"
            barStyle={{ backgroundColor: '#11698E' }}
        >
            <Tab.Screen
                name="Tienda"
                initialParams={{ token }}
                component={Product}
                options={{
                    tabBarLabel: 'Tienda Online',
                    tabBarIcon: ({ color }) => (
                        <Icon name="menu" color={color} size={20} />
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
                        <Icon name="layers" color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarLabel: 'Manual',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={20} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabScreen