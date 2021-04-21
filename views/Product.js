import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const Product = (props) => {

    //console.log("token en product: ", props.route.params.token);
    const token = props.route.params.token

    const [products, setProducts] = useState([])

    useEffect(() => {
        const products = []
        fetch('http://localhost:8080/API/tiendaJSON', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json;charset=UTF-8',
                'accept': 'application/json;charset=UTF-8'
            }
        })
            .then((response) => response.json())
            .then((repsonseJson) => {
                /* console.log("response: ", repsonseJson); */
                for (let i = 0; i < repsonseJson.tiendasList.length; i++) {
                    const { id, name, description, price, existence, photo } = repsonseJson.tiendasList[i]
                    products.push({
                        id,
                        name,
                        description,
                        price,
                        existence,
                        photo
                    })
                }
                console.log(products);
                setProducts(products)
                console.log("size tienda: ", repsonseJson.tiendasList.length);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#F2E4EC' }} >
            <ScrollView>
                <Text style={styles.title} > Tienda Online</Text >
                {
                    products.map(product => {
                        const urlPhoto = 'http://localhost:8080' + product.photo
                        return (
                            <Card key={product.id}>
                                <Card.Title style={styles.titleCard}>{product.name}</Card.Title>
                                <Card.Divider />
                                <Card.Image source={{ uri: urlPhoto }} style={styles.imageContent}></Card.Image>
                                <Card.Divider />
                                <Text style={styles.textDescription}>{product.description}</Text>
                                <Text style={styles.textPrice}>Precio: {product.price}</Text>
                                {/* <Text style={styles.textContentCard}>Existencia: {product.existence}</Text> */}
                                <Button
                                    icon={<Icon name='code' color='#ffffff' size='40' type='clear' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Agregar al carrito'
                                    onPress={() => { props.navigation.navigate('Carrito', { idProducto: product.id }) }}
                                />
                            </Card>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    titleCard: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    textDescription: {
        textAlign: 'center',
        fontSize: 22,
        paddingBottom: 5
    },
    textPrice: {
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 5
    },
    imageContent: {
        width: 300,
        height: 200,
        resizeMode: 'contain'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Product