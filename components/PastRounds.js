import 'react-native-gesture-handler';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity} from 'react-native';
import {addRound, getRound} from './api/RoundApi'

//import firebase from 'firebase/app';
import 'firebase/firestore'
//import { firestore } from 'react-native-firebase';

// state = {
//     roundList: [],
//     currentRound : null
// }

// const pastRound = await firestore().collection("rounds").doc
// ("46865sn3omOBLZhec9bi").get();

// onRoundAdded = (round) => {
//     console.log("round added");
//     console.log(round);

// }
// onRoundReceived =(roundList) => {
//     console.log(roundList);
//     this.setState(prevState => ({
//         roundList: prevState.roundList = roundList
//     }));
// }

// componentDidMount= () => {
//     getRound(onRoundReceived)
// }


const PastRounds = ({navigation})=>{
    return(
      <SafeAreaView style={styles.container}>
          {/* <Te
          <Button
          title='Submit'
          onPress={()=> addRound()}/> */}
      </SafeAreaView>
  
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    //   alignItems: 'center',
    //   justifyContent: 'center',
      //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    heading:{
      fontWeight:"bold",
      fontSize: 60,
      color:"#009933",
      marginBottom:60
    },
    inputView:{
      flexDirection: 'row',
      flex: 1,
      justifyContent: "space-between",
      width:"80%",
      marginLeft:45,
      
      alignItems: "center",
      //justifyContent:"center",
      padding:20
    },
    inputButtonView:{
        //flexDirection: 'row',
        //flex: 1,
        //justifyContent: "space-between",
        //width:"80%",
        
        alignItems: "center",
        //justifyContent:"center",
        //padding:20
      },
    textLabel:{
      flex: 1,
      fontSize: 15,
      fontWeight: "bold"
    },
    textLabelGIR:{
        fontSize: 20,
        margin: 3
    },
    inputTextView:{
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius:5,
        width: "40%",
        height: 30,
        padding: 5,
        //justifyContent: "flex-end",
        alignContent: "stretch"
    },
    inputTextViewGIR:{
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius:5,
        width: "20%",
        height: 30,
        padding: 5,
        //justifyContent: "flex-end",
        alignContent: "stretch"
    },
    inputTextLgn:{
        flex: 1,
      height:50,
      width: "80%",
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius:10,
      fontSize: 25,
     
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
    columnView:{
        flex: 1,
        flexDirection: "column",

    },
    imageView:{
        alignItems: "center"
        
    }

  });
  

  export default AddRound;

