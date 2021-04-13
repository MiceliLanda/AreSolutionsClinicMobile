import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import { Icon, Input, Button, Text } from 'react-native-elements';


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

      function obtenerToken(tkn) {
        console.log('token: ', tkn)
      }

      await fetch(`http://localhost:8080/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: requestBody
      })
        .then(function (response) {
          response.json()
            .then(function (responseServer) {
              obtenerToken(responseServer.token)
              /* alert('Login Sucess!! :D') */
              //console.log(responseServer.token); asi esta bien escrito
              props.navigation.navigate('Menu', { token: responseServer.token })
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
      <View><Text h3 h3Style={styles.title}>AreSolutions Clinic</Text></View>
      <View>
        <Input style={styles.inputs} onChangeText={(value) => recuperarDatos('user', value)} placeholder="Email" />
      </View>
      <View>
        <Input style={styles.inputs} secureTextEntry={true} onChangeText={(value) => recuperarDatos('password', value)} placeholder="Contraseña" />
      </View>
      <View>
        <Button buttonStyle={styles.btn} color="#000000" onPress={() => auth(state)} title="Log in" />
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
  },
  title: {
    /*     fontSize: 20, */
    padding: 10,
    textAlign: 'center',
    fontFamily: 'Monserrat'
  },
  inputs: {
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    textAlign: 'center',
    /* width:300, */
    margin: 5,
    alignItems: 'stretch',
    borderWidth: 0,
    fontFamily: 'Monserrat'
  },
  btn: {
    backgroundColor: "#560086",
    borderRadius: 50,
    height: 35,
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    padding: 5,
    alignSelf: 'center',
    color: 'black',
  },

});
