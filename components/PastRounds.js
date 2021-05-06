import 'react-native-gesture-handler';
import { FlatList, Button, StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import firebase from '../api/firebaseConfig';


function Users(){
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const dbRef = firebase.firestore();

  
  useEffect(()=>{
  const subscriber = dbRef.collection('users')
  .doc(firebase.auth().currentUser.uid)
  .collection('rounds')
  .onSnapshot(querySnapshot =>{
    const users = [];
    querySnapshot.forEach(documentSnapshot => {
      users.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id
      });
    });
    setUsers(users);
    setLoading(false);
  });
  return () => subscriber();


}, []);

if(loading){
  return <ActivityIndicator/>;
}
return(
  //<SafeAreaView style={styles.container}>
    <FlatList
    data={users}
    //numColumns={2}
    renderItem={({ item }) =>(
      <View style={styles.itemView}>
        <TouchableOpacity>
        <Text style={styles.textLabel}>Course: {item.course}</Text>
        </TouchableOpacity>
        <Text style={styles.parNum}>{item.score}/{item.par}</Text>
        <Text>Score/Par</Text>
        <Text>GIR: {item.gir}/{item.greens}</Text>
        <Text>FWH: {item.fwh}/{item.fairways}</Text>
        {/* <Button title="Update">Update</Button>
        <Button title="Delete">Delete</Button> */}
      </View>
    )}
    //keyExtractor={round => round.id}
    />
);
}






class PastRounds extends Component{
 // const user = this.dbRef.collection('users').doc(firebase.auth().currentUser.uid);
  constructor(){
    super();
    this.dbRef = firebase.firestore();
   

  }
  render(){
    
    return(
    <SafeAreaView style={styles.container}>
      <Users/>
    </SafeAreaView>
    )
  }
  
  
  
  // loadRounds(){
  // this.dbRef.collection('users').doc(firebase.auth().currentUser.uid).collection('rounds').get()
  // .then((snap) => {
  //   console.log('testLR');
  //   snap.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // });

  // }

  // useEffect(() => {
  //   loadRounds();
  // }, []);
  // componentDidMount = () =>{
  //   this.focusListener = this.props.navigation.addListener('focus', 
  //   ()=> {
  //     console.log('testCDM');
  //     this.loadRounds()
  //   })
  // }

  //loadRounds();
 
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
    textLabel:{
      flex: 1,
      fontSize: 20,
      fontWeight: "bold",
      color: 'white'
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
        
    },
    itemView: {
      backgroundColor: 'green',
      padding: 20,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 20
    },
    parNum: {
      fontSize: 30,

    }

  });
  

  export default PastRounds;
