import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native'
import { View } from "react-native"
import { Button, Card, CheckBox, Icon, PricingCard } from 'react-native-elements';

const Carrito = (props) => {

    const id = props.route.params.idProducto;
    const token = props.route.params.token
    const [idProducts, setIdProducts] = useState([])//db
    const [checked, toggleChecked] = useState(false);//checkbox
    const [namePay, setNamePay] = useState('Tarjeta')//Tipo de pago
    let suma = 0

    useEffect(() => {
        if (id == null) {
            getCarrito()
        } else {
            addProduct()
        }
    }, [id])

    const getCarrito = async () => {
        const carrito = []
        await fetch('http://localhost:8080/API/carritoJSON', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json;charset=UTF-8',
                'accept': 'application/json;charset=UTF-8'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("aver: ", responseJson.carritoList);
                for (let i = 0; i < responseJson.carritoList.length; i++) {
                    const { id, name, description, price, existence, photo } = responseJson.carritoList[i]
                    carrito.push({
                        id,
                        name,
                        description,
                        price,
                        existence,
                        photo
                    })
                    /* console.log(responseJson.carritoList[i].price); */
                    /* suma = suma + responseJson.carritoList[i].price */
                }
                console.log(carrito);
                setIdProducts(carrito)
                console.log("size tienda:", responseJson.carritoList.length);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const addProduct = async () => {
        const carrito = []
        await fetch('http://localhost:8080/API/carritoJSON/' + id, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json;charset=UTF-8',
                'accept': 'application/json;charset=UTF-8'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("aver: ", responseJson.carritoList);
                for (let i = 0; i < responseJson.carritoList.length; i++) {
                    const { id, name, description, price, existence, photo } = responseJson.carritoList[i]
                    carrito.push({
                        id,
                        name,
                        description,
                        price,
                        existence,
                        photo
                    })
                }
                /* suma = suma + responseJson.carritoList[i].price */
                console.log(carrito);
                setIdProducts(carrito)
                console.log("size tienda:", responseJson.carritoList.length);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const postPagar = async () => {
        const dateNow = new Date()
        const fechaHoy = "" + dateNow.getFullYear() + "-0" + (dateNow.getMonth() + 1) + "-" + dateNow.getDate() + ""
        console.log("fecha: ", fechaHoy);
        const id_user = 2
        const total = suma
        const metodo_pago = 'Efectivo'
        const fecha = fechaHoy
        //const requestBody = `id_user=${id_user}&total=${total}&metodo_pago=${metodo_pago}&fecha=${fecha}`
        const requestBody = `{ "id_user":"${id_user}","total":"${total}","metodo_pago":"${metodo_pago}","fecha":"${fecha}" }`
        console.log("aberqwe: ", requestBody);

        await fetch('http://localhost:8080/API/carritoJSON/venta', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json;charset=UTF-8',
                'accept': 'application/json;charset=UTF-8'
            },
            body: requestBody
        })
            .then((response) => response.json())
            .then((responseServer) => { console.log(responseServer) })
            .catch((e) => {
                console.log(e);
                alert('Lo sentimos, ah ocurrido un error ', e)
            })
    }

    const deleteProductCarrito = () => {

    }

    return (
        <View style={{ flex: 1 }} >
            <ScrollView>
                <Text style={styles.title} >Carrito</Text>
                {
                    idProducts.map((carrito, index) => {
                        suma += carrito.price
                        const urlPhoto = 'http://localhost:8080' + carrito.photo
                        return (
                            <Card key={index}>
                                <Text>IDProducto: {carrito.id}, IDArray: {index}</Text>
                                <Card.Title style={styles.titleCard}>{carrito.name}</Card.Title>
                                <Card.Divider />
                                <Card.Image source={{ uri: urlPhoto }} style={styles.imageContent}></Card.Image>
                                <Card.Divider />
                                <Text style={styles.textContentCard}>{carrito.description}</Text>
                                <Text style={styles.textContentCard}>Precio: {carrito.price}</Text>
                                <Button
                                    /* icon={<Icon name='code' color='#ffffff' size='40' type='clear' />} */
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, }}
                                    title='Eliminar al carrito'
                                /* onPress={() => { console.log("ID: ", product.id) }} */
                                /* onPress={() => { props.navigation.navigate('Carrito', { idProducto: product.id }) }} */
                                />
                            </Card>
                        )
                    })
                }
                <View>
                    <Text>Metodo de Pago</Text>
                    <CheckBox
                        title='Tarjeta'
                        checked={!checked}
                        onPress={() => toggleChecked(!checked)}
                        onPressOut={() => setNamePay('Tarjeta')}
                    />
                    <CheckBox
                        title='Efectivo'
                        checked={checked}
                        onPress={() => toggleChecked(!checked)}
                        onPressOut={() => setNamePay('Efectivo')}
                    />
                </View>
                <View>
                    <PricingCard
                        color="#4f9deb"
                        title="Datos de Pago"
                        price={'$' + suma}
                        info={['Metodo de pago: ' + namePay]}
                        button={{ title: 'PAGAR' }}
                        onButtonPress={() => postPagar()}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default Carrito