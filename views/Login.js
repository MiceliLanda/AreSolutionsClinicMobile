import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Input, Button, Text } from 'react-native-elements';

const Login = (props) => {

  const [state, setState] = useState({
    user: '',
    password: ''
  });

  const recuperarDatos = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const auth = async (str) => {
    if (str.user === '' && str.password === '') {
      alert('No puede dejar los campos vacios')
    } else if (str.user === '') {
      alert('Ingrese nombre de Usuario o Email')
    } else if (str.password === '') {
      alert('Ingrese una Contraseña')
    } else {

      const User = encodeURIComponent(str.user);
      const Password = encodeURIComponent(str.password);
      const requestBody = `user=${User}&password=${Password}`;

      await fetch(`http://10.0.2.2:8080/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: requestBody
      })
        .then(function (response) {
          response.json()
            .then(function (responseServer) {
              if (responseServer.token === null || responseServer.token == undefined) {
                alert('Lo sentimos, ah ocurrido un error');
                console.log(responseServer.token);
              } else {
                if (responseServer.userId === 1) {
                  alert('Oh,Oh, Solo pueden ingresar Owners :(')
                } else {
                  alert('Login Sucess!! :D')
                  console.log("ver: ", responseServer);
                  props.navigation.navigate('Menu', { token: responseServer.token, idUser: responseServer.userId })
                }
              }
            })
            .catch(function (e) {
              console.log(e);
              alert('Lo sentimos, ah ocurrido un error ', e)
            });
        })
        .catch(function (e) {
          console.log(e);
          alert(e)
        });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ backgroundColor: '#11698E', borderRadius: 10, paddingVertical: 20, paddingHorizontal: 20 }}>
        <View><Text h3 h3Style={styles.title}>AreSolutions Clinic</Text></View>
        <View>
          <Input style={styles.inputs} onChangeText={(value) => recuperarDatos('user', value)} placeholder="Email" />
        </View>
        <View>
          <Input style={styles.inputs} secureTextEntry={true} onChangeText={(value) => recuperarDatos('password', value)} placeholder="Contraseña" />
        </View>
        <View>
          <Button buttonStyle={styles.btn} onPress={() => auth(state)} title="Iniciar Sesion" />
        </View>
      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    justifyContent: 'center',
    backgroundColor: '#E8E8EF'
  },
  title: {
    padding: 10,
    textAlign: 'center',
    color: 'white',
    /* fontFamily: 'Monserrat', */
    fontStyle: 'italic'
  },
  inputs: {
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    textAlign: 'center',
    margin: 5,
    alignItems: 'stretch',
    borderWidth: 0,
    /* fontFamily: 'Monserrat' */
  },
  btn: {
    backgroundColor: "#1E1E1E",
    borderRadius: 50,
    height: 35,
    alignItems: 'center',
  },
});
