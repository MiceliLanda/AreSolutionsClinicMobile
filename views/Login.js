import React, {useState} from 'react'
import { View,Text, StyleSheet, Button,ScrollView, TextInput,Alert} from 'react-native'


const Login = (props) => {

    const [state, setState] = useState({
        user :'',
        password: ''
    });

    const recuperarDatos = (name, value) => {
        setState({...state,[name]: value});
    };

    const auth = async(str)=> {
      if( str.user === '' && str.password === ''){
        alert('No puede dejar los campos vacios')
     }else if(str.user === ''){
        alert('Ingrese nombre de Usuario o Email')
      }else if(str.password === ''){ 
        alert('Ingrese una Contraseña')
      }else{

      const User = encodeURIComponent(str.user);
      const Password = encodeURIComponent(str.password);
      const requestBody = `user=${User}&password=${Password}`;

      function obtenerToken(tkn){
        console.log('token: ',tkn)
      }

     await fetch(`http://localhost:8080/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: requestBody
        })
        .then(function(response){ 
            response.json()
          .then(function(responseServer) { 
            obtenerToken(responseServer.token)
             alert('Login Sucess!! :D')
             props.navigation.navigate('Product')
            })
            .catch(function(e){
              console.log(e);
              alert('Lo sentimos, ah ocurrido un error ',e)
            });
        })
          .catch(function(e){
              console.log(e);
              alert(e)
            });
      } 
    }

    return (
        <ScrollView style={styles.container}>
            <View><Text style={styles.text}>AreSolutions Clinic</Text></View>
            <View>
                <TextInput style={styles.inputs} onChangeText={(value) => recuperarDatos('user',value)} placeholder="Email"/>
            </View>
            <View>
                <TextInput style={styles.inputs}  secureTextEntry={true} onChangeText={(value) => recuperarDatos('password',value)} placeholder="Contraseña"/>
            </View>
            <View>
            <Button color="#000000" onPress={() => auth(state)} title="Log in"/>
            </View>
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,     
      padding:35
    },
    title:{
      fontSize:20,
      padding:10,
      textAlign:'center',
    },
    inputs:{
      backgroundColor:"#f1f1f1",
      borderWidth:1,
      textAlign:'center',
      /* width:300, */
      margin:10,
      alignItems:'stretch'
    },
    btn:{
      backgroundColor: "#20B685",
      borderRadius:50,
      height:35,
      alignItems:'center'
    },
    text:{
      fontSize:20,
      padding:5,
      alignSelf:'center',
      color:'black',
    },

  });
