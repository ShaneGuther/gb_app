import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import firebase from '../api/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const validator = require('validator');

class SignUp extends Component{
  constructor(){
    super();
    this.dbRef = firebase.firestore().collection('users');
    this.state = {
     fname: '',
     lname: '',
     email: '',
     password: ''
    };
  }


  inputValueUpdate = (val, prop) =>{
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser(){
    if(!validator.isEmail(this.state.email)){
      Alert.alert("Email must be proper format! (ex. johndoe@example.com");
    }else{
      this.dbRef.add({
        fname: this.state.fname,
        lname: this.state.lname,
        email:this.state.password,
        password: this.state.password
      }).then((res) =>{
        this.setState({
          fname: '',
          lname: '',
          email: '',
          password: ''
        });
        this.props.navigation.navigate('Home')
      }).catch((err)=>{
        console.log("error: ", err);
      });
    }
  }


    render(){
        return(
            <KeyboardAwareScrollView style={styles.container}
            behavior="padding">
              <View
              style={styles.columnView}>
            <Text style={styles.heading}>Golf Buddy</Text>
            <View style={styles.inputView}>
            <TextInput
              style={styles.inputTextLgn}
              placeholder="First Name..."
              placeholderTextColor="#003f5c"
              onValueChange={(val) => this.inputValueUpdate(val, 'fname')}
            />
              </View>
            <View style={styles.inputView}>
            <TextInput
              style={styles.inputTextLgn}
              placeholder="Last Name"
              placeholderTextColor="#003f5c"
              onValueChange={(val) => this.inputValueUpdate(val, 'lname')}
            />
              </View>
            <View style={styles.inputView}>
            <TextInput
              style={styles.inputTextLgn}
              placeholder="Email..."
              placeholderTextColor="#003f5c"
              keyboardType="email-address"
              textContentType="emailAddress"
              onValueChange={(val) => this.inputValueUpdate(val, 'email')}
              //onChangeText={text => this.setState({email:text})}
              />
              </View>
              <View style={styles.inputView}>
                <TextInput
              style={styles.inputTextLgn}
              placeholder="Password..."
              placeholderTextColor="#003f5c"
              textContentType="password"
              onValueChange={(val) => this.inputValueUpdate(val, 'password')}
              /></View>
              <TouchableOpacity style={styles.loginBtn} 
              onPress={() => this.storeUser()}>
                <Text style={styles.loginBtnTxt}
                >Sign Up!</Text>
              </TouchableOpacity>
              </View>
              
          </KeyboardAwareScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      //alignItems: 'center',
      //justifyContent: 'center',
      //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    heading:{
      fontWeight:"bold",
      fontSize: 60,
      color:"#009933",
      marginBottom:60,
      marginLeft: "auto",
      marginRight: "auto"
    },
    inputView:{
      flexDirection: "row",
      alignItems: 'center',
      width:"80%",
      borderColor: "grey",
      borderStyle: "solid",
      color: 'green',
      borderWidth: 1,
      borderRadius:10,
      height:50,
      marginBottom:20,
      justifyContent:"space-between",
      //justifyContent: "center",
      padding:20,
      flex: 1,
      marginLeft: "auto",
      marginRight: "auto",
    },
    inputTextLgn:{
      height:50,
      width: "80%",
      color:"green",
      justifyContent: "center",
      alignItems: "center"
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
      marginBottom:30,
      marginLeft: "auto",
      marginRight: "auto"
    },
    loginBtnTxt:{
      fontSize: 21,
      color: "white"
    },
    signUpText:{
      marginTop: 15,
      fontSize: 15
    },
    columnView:{
      flex: 1,
      flexDirection: "column",

  }
  });
  
export default SignUp;