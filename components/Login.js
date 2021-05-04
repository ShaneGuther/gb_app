import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity, Alert} from 'react-native';
import { NavigationRouteContext } from '@react-navigation/core';
import firebase from 'firebase';


  class Login extends Component{
    constructor(props){
      super(props);
      //this.dbRef = firebase.firestore().collection('users');
      this.state = {
       email: '',
       password: ''
      };
  
      this.signUpUser = this.signInUser.bind(this);
    }
  
  
    // inputValueUpdate = (val, prop) =>{
    //   const state = this.state;
    //   state[prop] = val;
    //   this.setState(state);
    // }
  
    signInUser(){
      const { fname, lname, email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) =>{
        console.log(result);
        this.props.navigation.navigate('Home')
      }).catch((err) =>{
        Alert.alert("Please enter the correct login details!");
        console.log("error: ", err);
      });
    }

    render(){
    return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Golf Buddy</Text>
        <View style={styles.inputView}>
        <TextInput
          style={styles.inputTextLgn}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          //value= {this.state.email}
          onChangeText={text => this.setState({email:text})}
          />
          </View>
          <View style={styles.inputView}>
            <TextInput
          style={styles.inputTextLgn}
          placeholder="Password..."
          //value={this.state.password}
          placeholderTextColor="#003f5c"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={text => this.setState({password:text})}
          /></View>
  
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} 
          onPress={() => this.signInUser()}
          >
            <Text style={styles.loginBtnTxt}
            >LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Don't have an account?  Sign up!</Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
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
      color:"black"
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