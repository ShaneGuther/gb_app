
import 'react-native-gesture-handler';
import React from 'react';
//import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity, Component} from 'react-native';

export default class HomePage extends React.Component{
  render(){
//const HomePage = ({navigation}) =>{
    return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.areaTitles}>Rounds</Text>
      <TouchableOpacity style={styles.loginBtn}
      onPress={() => this.props.navigation.navigate('PastRounds')}>
        <Text style={styles.loginBtnTxt}>View Past Rounds</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={styles.loginBtn}  
      onPress={() => this.props.navigation.navigate('AddRound')}
      >
        <Text style={styles.loginBtnTxt}>Add New Round</Text>
      </TouchableOpacity>
      <Text style={styles.areaTitles}>Profile</Text>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnTxt}>Season Stats</Text>
      </TouchableOpacity>
      <Text style={styles.areaTitles}>Shot Tracker</Text>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnTxt}>Measure a Shot</Text>
      </TouchableOpacity>
    </SafeAreaView>
    )
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
  areaTitles:{
    marginTop:20,
    marginBottom: 13,
    fontSize: 30,
    fontWeight: "bold"
  }
});

//export default HomePage;