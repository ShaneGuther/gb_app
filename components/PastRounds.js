import 'react-native-gesture-handler';
import { FlatList, Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity} from 'react-native';
import React, { Component } from 'react';
import firebase from '../api/firebaseConfig';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];
const Round = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const renderRound = ({ round }) => (
  <Item title={round.title} />
);

class PastRounds extends Component{
  constructor(){
    super();
  }
  
  render(){
    return(
      <SafeAreaView style={styles.container}>
        <FlatList
        data={DATA}
        renderItem={renderRound}
        keyExtractor={round => round.id}/>

          {/* <Te
          <Button
          title='Submit'
          onPress={()=> addRound()}/> */}
      </SafeAreaView>
  
    );
  }
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
  

  export default PastRounds;

