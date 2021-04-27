import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity, DatePickerAndroid, StatusBarIOS, TouchableNativeFeedbackBase, Keyboard} from 'react-native';
import firebase from '../api/firebaseConfig';
import Animated from 'react-native-reanimated';




export default class AddRound extends Component{
    constructor(){
      super();
      this.dbRef = firebase.firestore().collection('rounds');
      this.state = {
        course:'',
        fairways: '',
        fwh: '',
        gir: '',
        greens: '',
        par: '',
        score: '',
        weather: '',
      };
    }


    inputValueUpdate = (val, prop) =>{
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }

    storeRound(){
      if(this.state.course === '' || this.state.par === '' || this.state.score === ''){
        alert("Course name, par and score are required!");
      }else{
        this.setState({
          isLoading: true,
        });
      this.dbRef.add({
        course: this.state.course,
        fairways: this.state.fairways,
        fwh: this.state.fwh,
        gir: this.state.gir,
        greens: this.state.greens,
        par: this.state.par,
        score: this.state.score,
        weather: this.state.weather,
        isLoading: false,
      }).then((res) => {
        this.setState({
        course:'',
        fairways: '',
        fwh: '',
        gir: '',
        greens: '',
        par: '',
        score: '',
        weather: '',
        });
        this.props.navigation.navigate('')
      }).catch((err) =>{
        console.log("error", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  
  render(){
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
                <TextInput 
                styles={styles.inputTextLgn}
                value={this.state.course}
                onChangeText={(val) => this.inputValueUpdate(val, 'course')}
                />
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Course Par</Text>
                <View style={styles.inputTextView}>
                <TextInput 
                styles={styles.inputTextLgn}  
                //keyboardType= 'numeric'
                value={this.state.par}
                onChangeText={(val) => this.inputValueUpdate(val, 'par')}
                />
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Score</Text>
                <View style={styles.inputTextView}>
                <TextInput 
                styles={styles.inputTextLgn}
                //keyboardType='numeric'
                value={this.state.score}
                onChangeText={(val) => this.inputValueUpdate(val, 'score')}
                 />
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Greens in Regulation*</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput 
                    styles={styles.inputTextLgn}
                    //keyboardType= 'numeric'
                    value={this.state.gir}
                    onChangeText={(val) => this.inputValueUpdate(val, 'gir')}
                    />
                </View>
                <Text style={styles.textLabelGIR}>/</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput 
                    styles={styles.inputTextLgn}
                    //keyboardType= 'numeric'
                    value={this.state.greens}
                    onChangeText={(val) => this.inputValueUpdate(val, 'greens')}
                    />
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Fairways Hit*</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput 
                    styles={styles.inputTextLgn}
                    //keyboardType= 'numeric'
                    value={this.state.fwh}
                    onChangeText={(val) => this.inputValueUpdate(val, 'fwh')}
                    />
                </View>
                <Text style={styles.textLabelGIR}>/</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput 
                    styles={styles.inputTextLgn}
                    //keyboardType= 'numeric'
                    value={this.state.fairways}
                    onChangeText={(val) => this.inputValueUpdate(val, 'fairways')}
                    />
                </View>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Weather*</Text>
                <View style={styles.inputTextView}>
                <TextInput 
                styles={styles.inputTextLgn}
                value={this.state.weather}
                onChangeText={(val) => this.inputValueUpdate(val, 'weather')}
                ></TextInput>
                </View>
            </View>
            <View style={styles.inputButtonView}>
                <TouchableOpacity 
                style={styles.loginBtn}
                onPress={() => this.storeRound()}
                onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Text style={styles.loginBtnTxt}>Add Round</Text>
                </TouchableOpacity>
            </View>
        </View>
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
  