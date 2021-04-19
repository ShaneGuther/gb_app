import 'react-native-gesture-handler';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity} from 'react-native';



const AddRound = ({navigation})=>{
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.imageView}>
        <Image 
        style={{height: 250, width: 250}}
        source={require("../assets/gcexample.png")}
        />
        </View>
        <View style={styles.columnView}>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Course Name</Text>
                <View style={styles.inputTextView}>
                <TextInput styles={styles.inputTextLgn} placeholder="test"></TextInput>
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Course Par</Text>
                <View style={styles.inputTextView}>
                <TextInput styles={styles.inputTextLgn}  keyboardType= 'numeric'></TextInput>
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Score</Text>
                <View style={styles.inputTextView}>
                <TextInput styles={styles.inputTextLgn}
                 keyboardType= 'numeric'></TextInput>
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Greens in Regulation*</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput styles={styles.inputTextLgn}
                    keyboardType= 'numeric'></TextInput>
                </View>
                <Text style={styles.textLabelGIR}>/</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput styles={styles.inputTextLgn}
                    keyboardType= 'numeric'></TextInput>
                </View>

            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Fairways Hit*</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput styles={styles.inputTextLgn}
                    keyboardType= 'numeric'></TextInput>
                </View>
                <Text style={styles.textLabelGIR}>/</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput styles={styles.inputTextLgn}
                    keyboardType= 'numeric'></TextInput>
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Weather*</Text>
                <View style={styles.inputTextView}>
                <TextInput styles={styles.inputTextLgn}></TextInput>
                </View>
            </View>
            <View style={styles.inputButtonView}>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginBtnTxt}>Add Round</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        
            

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

