import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image } from 'react-native';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, Icon, ListItem } from 'react-native-elements';

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
        <ScrollView>
            <Text style={styles.title} > Tienda Online</Text >
            {
                products.map(product => {
                    const urlPhoto = 'http://localhost:8080' + product.photo
                    return (
                        /*                         <ListItem key={product.id} bot>
                                                    <ListItem.Chevron />
                                                    <ListItem.Content>
                                                        <ListItem.Title>{product.name}</ListItem.Title>
                                                        <ListItem.Subtitle>{product.description}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem> 
                                                <Avatar source={{ uri: prueba }} rounded />*/
                        <Card key={product.id}>
                            <Card.Title style={styles.titleCard}>{product.name}</Card.Title>
                            <Card.Divider />
                            <Card.Image source={{ uri: urlPhoto }} style={styles.imageContent}></Card.Image>
                            <Card.Divider />
                            <Text style={styles.textContentCard}>{product.description}</Text>
                            <Text style={styles.textContentCard}>Precio: {product.price}</Text>
                            <Text style={styles.textContentCard}>Existencia: {product.existence}</Text>
                            <Button
                                icon={<Icon name='code' color='#ffffff' size='40' type='clear' />}
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, }}
                                title='BUY'
                            />
                        </Card>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignSelf: 'center',
        padding: 10,
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    titleCard: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    textContentCard: {
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 5
    },
    imageContent: {
        width: 300,
        height: 200,
        /*         position: 'relative', */
        resizeMode: 'contain'
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})

export default Product