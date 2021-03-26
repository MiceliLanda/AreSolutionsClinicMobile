import React, {useState} from 'react'
import { View,Text, StyleSheet, Button,ScrollView, TextInput} from 'react-native'


const Login = () => {

    const [state, setState] = useState({
        username :'',
        password: ''
    });

    const recuperarDatos = (name, value) => {
        setState({...state,[name]: value});
    };

    function envio(state){
        console.log(state);
        fetch('http://localhost:8080/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded, ','Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(state)
        }).then(res => console.log(res.json()))
          .then(data => {
            console.log('data->',data);
          })
          .catch(rejected => {
              console.log('catch ->',rejected);
          });
    }


    return (
        <ScrollView style={styles.container}>
            <View><Text style={styles.text}>AreSolutions Clinic</Text></View>
            <View>
                <TextInput style={styles.inputs} onChangeText={(value) => recuperarDatos('username',value)} placeholder="Email"/>
            </View>
            <View>
                <TextInput style={styles.inputs}  secureTextEntry={true} onChangeText={(value) => recuperarDatos('password',value)} placeholder="Contraseña"/>
            </View>
            <View>
            <Button color="#000000" onPress={() => envio(state)} title="Log in"/>
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
