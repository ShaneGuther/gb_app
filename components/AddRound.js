import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, 
  Image, Platform, TextInput, TouchableOpacity, 
  DatePickerAndroid, StatusBarIOS, TouchableNativeFeedbackBase, 
  ScrollView, Alert, KeyboardAvoidingView, Dimensions, KeyboardAware} from 'react-native';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import {Picker} from '@react-native-picker/picker';
import firebase from '../api/firebaseConfig';
import Animated from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';




class AddRound extends Component{
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
        Alert.alert("Course name, par and score are required!");
      }else if(this.state.greens > 18 || this.state.gir > 18){
        Alert.alert('Greens/gir must be less than 18!');
      }else if(this.state.fairways > 18 || this.state.fwh > 18){
        Alert.alert('Fairways/fairways hit must be less than 18!');
      }else{
        this.dbRef.add({
        course: this.state.course,
        fairways: this.state.fairways,
        fwh: this.state.fwh,
        gir: this.state.gir,
        greens: this.state.greens,
        par: this.state.par,
        score: this.state.score,
        weather: this.state.weather,
        
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
        this.props.navigation.navigate('Home')
        //this.props.navigation.navigate('PastRounds')
      }).catch((err) =>{
        console.log("error: ", err);
      });
    }
  }
  
  render(){
    return(

      <KeyboardAwareScrollView style={styles.container}>
       <View style={styles.imageView}>
        <Image 
        source={require("../assets/gcexample.png")}
        style={{height: 200, width: 200}}
        />
        </View>
        <View style={styles.columnView}
        resetScrollToCoords={{x:0, y:0}}
        contentContainerStyle={styles.columnView}
        scrollEnabled={false}>
           
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Course Name</Text>
                <View style={styles.inputTextViewCourse}>
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
                <RNPickerSelect
                style={styles.pickerStyle}
                placeholder= {{}}
                onValueChange={(val) => this.inputValueUpdate(val, 'par')}
                //onValueChange={(value) => console.log(value)}
                items={[
                  {label: '68', value: 68, color: 'green'},
                  {label: '69', value: 69, color: 'green'},
                  {label: '70', value: 70, color: 'green'},
                  {label: '71', value: 71, color: 'green'},
                  {label: '72', value: 72, color: 'green'},
                  {label: '73', value: 73, color: 'green'},
                  {label: '74', value: 74, color: 'green'},
                ]}
                useNativeAndroidPickerStyle={false}>
                </RNPickerSelect>
                  </View>
            </View>

{/* 
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Course Par</Text>
                <View style={styles.inputTextView}>
                <TextInput 
                styles={styles.inputTextLgn}  
                keyboardType= 'numeric'
                value={this.state.par}
                onChangeText={(val) => this.inputValueUpdate(val, 'par')}
                />
                </View>
            </View> */}


            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Score</Text>
                <View style={styles.inputTextView}>
                <TextInput 
                styles={styles.inputTextLgn}
                keyboardType='numeric'
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
                    keyboardType= 'numeric'
                    value={this.state.gir}
                    onChangeText={(val) => this.inputValueUpdate(val, 'gir')}
                    />
                </View>
                <Text style={styles.textLabelGIR}>/</Text>
                
                
                <View style={styles.inputTextViewGIR}>
                <RNPickerSelect
                style={styles.pickerStyle}
                placeholder= {{}}
                onValueChange={(val) => this.inputValueUpdate(val, 'greens')}
                //onValueChange={(value) => console.log(value)}
                items={[
                  {label: '9', value: 9, color: 'green'},
                  {label: '18', value: 18, color: 'green'},
                ]}
                useNativeAndroidPickerStyle={false}>
                </RNPickerSelect>
                  </View>
            
                {/* <View style={styles.inputTextViewGIR}>
                    <TextInput 
                    styles={styles.inputTextLgn}
                    keyboardType= 'numeric'
                    value={this.state.greens}
                    onChangeText={(val) => this.inputValueUpdate(val, 'greens')}
                    />
                </View> */}
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLabel}>Fairways Hit*</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput 
                    styles={styles.inputTextLgn}
                    keyboardType= 'numeric'
                    value={this.state.fwh}
                    onChangeText={(val) => this.inputValueUpdate(val, 'fwh')}
                    />
                </View>
                <Text style={styles.textLabelGIR}>/</Text>
                <View style={styles.inputTextViewGIR}>
                    <TextInput 
                    styles={styles.inputTextLgn}
                    keyboardType= 'numeric'
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
                title='Add Round'
                style={styles.loginBtn}
                onPress={() => this.storeRound()}
                >
                    <Text style={styles.loginBtnTxt}>Add Round</Text>
                    </TouchableOpacity>
                    
            </View>
            <View style={styles.inputView}>
            <Text style = {styles.textLabel}>* is optional</Text>
            </View>
        </View>
      </KeyboardAwareScrollView>
  
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
      justifyContent:"center",
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
      fontSize: 20,
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
        width: "20%",
        height: 50,
        padding: 5,
        color: 'black',
        //fontSize: 50,
        //justifyContent: "flex-end",
        //alignContent: "stretch",
        alignItems: "center",
        justifyContent: "center"
    },
    inputTextViewCourse:{
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius:5,
      width: "40%",
      height: 40,
      padding: 5,
      color: 'black',
      fontSize: 40,
      //justifyContent: "flex-end",
      //alignContent: "stretch",
      alignItems: "center",
      alignItems: "stretch"
      //justifyContent: "center"
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
      width: "100%",
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius:10,
      //fontSize: 25,
     
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
        alignItems: "center",
        //width: (Dimensions.get('window').width/20),
        //height: (Dimensions.get('window').height)/20,
        //resizeMode: 'stretch',
        
    },
    pickerStyle:{
      fontSize: 40,
      alignItems: "center",
      justifyContent: "center"
    }

  });
  
  export default AddRound;