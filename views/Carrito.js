import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, CheckBox, PricingCard, ListItem, Avatar } from 'react-native-elements';

const Carrito = (props) => {

    const id = props.route.params.idProducto;
    const token = props.route.params.token
    const [idProducts, setIdProducts] = useState([])//db
    const [checked, toggleChecked] = useState(false);//checkbox
    const [namePay, setNamePay] = useState('Tarjeta')//Tipo de pago
    let suma = 0

    useEffect(() => {
        //console.log("id del producto: ", id);
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
                //console.log("aver: ", responseJson.carritoList);
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
                //console.log(carrito);
                setIdProducts(carrito)
                //console.log("size tienda:", responseJson.carritoList.length);
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
                //console.log(carrito);
                setIdProducts(carrito)
                //console.log("size tienda:", responseJson.carritoList.length);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const postPagar = async () => {
        const dateNow = new Date()
        const fechaHoy = "" + dateNow.getFullYear() + "-0" + (dateNow.getMonth() + 1) + "-" + dateNow.getDate() + ""
        //console.log("fecha: ", fechaHoy);
        const id_user = 2
        const total = suma
        const metodo_pago = namePay
        const fecha = fechaHoy
        //const requestBody = `id_user=${id_user}&total=${total}&metodo_pago=${metodo_pago}&fecha=${fecha}`
        const requestBody = `{ "id_user":"${id_user}","total":"${total}","metodo_pago":"${metodo_pago}","fecha":"${fecha}" }`
        //console.log("aberqwe: ", requestBody);

        if (suma == 0) {
            alert('Debe tener productos en el carrito')
        } else {
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
                .then((responseServer) => {
                    console.log(responseServer)
                    alert('Su compra ha sido un exito')
                    getCarrito()
                })
                .catch((e) => {
                    console.log(e);
                    alert('Lo sentimos, ah ocurrido un error ', e)
                })
        }
    }

    const deleteProductCarrito = async (index) => {
        const requestBody = `{ }`
        await fetch('http://localhost:8080/API/carritoJSON/delete/' + index, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json;charset=UTF-8',
                'accept': 'application/json;charset=UTF-8'
            },
            body: requestBody
        })
            .then((responseServer) => {
                /* console.log(responseServer) */
                alert('Se ha eliminado de tu carrito')
                getCarrito()
            })
            .catch((e) => {
                console.log(e);
                alert('Lo sentimos, ah ocurrido un error ', e)
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F2E4EC' }} >
            <ScrollView>
                <Text style={styles.title} >Carrito</Text>
                {
                    idProducts.map((carrito, index) => {
                        suma += carrito.price
                        const urlPhoto = 'http://localhost:8080' + carrito.photo
                        return (
                            <ListItem key={index} bottomDivider style={styles.ItemList}>
                                <Avatar source={{ uri: urlPhoto }} />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.titleCard} >{carrito.name} </ListItem.Title>
                                    <ListItem.Subtitle>{carrito.description} </ListItem.Subtitle>
                                    <ListItem.Subtitle style={styles.textContentCard} >Precio: {carrito.price} </ListItem.Subtitle>
                                </ListItem.Content>
                                <Button
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, }}
                                    title='Eliminar'
                                    onPress={() => deleteProductCarrito(index)}
                                />
                            </ListItem>
                        )
                    })
                }
                <View>
                    <Card>
                        <Card.Title>Metodo de Pago</Card.Title>
                        <Card.Divider />
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
                    </Card>
                </View>
                <View>
                    <PricingCard
                        color="#3E5560"
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
        marginRight: 15,
        marginLeft: 15,
        //borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        //color: '#20232a',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleCard: {
        fontWeight: 'bold',
    },
    ItemList: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15
    },
    textContentCard: {
        fontStyle: 'italic',
        textAlign: 'center',
        paddingBottom: 5
    },
})

export default Carrito