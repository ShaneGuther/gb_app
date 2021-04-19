import 'react-native-gesture-handler';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity} from 'react-native';



const Login = ({navigation}) => {
    return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Golf Buddy</Text>
        <View style={styles.inputView}>
        <TextInput
          style={styles.inputTextLgn}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={text => this.setState({email:text})}/>
          </View>
          <View style={styles.inputView}>
            <TextInput
          style={styles.inputTextLgn}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          //onChangeText={text => this.setState({email:text})}
          /></View>
  
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} 
          onPress={() => navigation.navigate('Home')}>
            <Text style={styles.loginBtnTxt}
            >LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Don't have an account?  Sign up!</Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    heading:{
      fontWeight:"bold",
      fontSize: 60,
      color:"#009933",
      marginBottom:60
    },
    inputView:{
      width:"80%",
      borderColor: "grey",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius:10,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputTextLgn:{
      height:50,
      color:"white"
    },
    inputTextAdd:{
  
    },
    forgot:{
      color:"black",
      fontSize:15,
      margin: 20
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#009933",
      borderRadius:10,
      height:60,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:30
    },
    loginBtnTxt:{
      fontSize: 21,
      color: "white"
    },
    signUpText:{
      marginTop: 15,
      fontSize: 15
    },
  });
  

  export default Login;