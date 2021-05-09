import "react-native-gesture-handler";
import React, { Component, useEffect, useState } from "react";
import {
  Button,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationRouteContext } from "@react-navigation/core";
import firebase from "firebase";

//globabl variables for calculating scoring average
var count = 0;
var totalPar = 0;
var totalScore = 0;
var averageScore = 0;
var scoreMsg = "";

function Stats() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const dbRef = firebase.firestore();

  //retrieving data from firestore
  useEffect(() => {
    totalPar = 0;
    totalScore = 0;
    averageScore = 0;
    count = 0;
    const subscriber = dbRef
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("rounds")
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          count += 1;
          totalPar = parseInt(totalPar) + parseInt(documentSnapshot.data().par);
          totalScore =
            parseInt(totalScore) + parseInt(documentSnapshot.data().score);
          //}
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        averageScore = totalScore - totalPar;
        averageScore /= count;
        // totalPar = totalPar / count;
        // totalScore = totalScore / count;

        if (averageScore > 0) {
          averageScore = Math.round(Math.abs(averageScore));
          scoreMsg = `Average Score: ${averageScore} under`;
        } else if (averageScore < 0) {
          averageScore = Math.round(Math.abs(averageScore));
          scoreMsg = `Average Score: ${averageScore} over`;
        } else {
          scoreMsg = "Even par;";
        }

        console.log(totalPar);
        setUsers(users);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView>
      <View style={styles.inputView}>
        <Text style={styles.textLabel}>{scoreMsg}</Text>
        <Text style={styles.textLabel}>Total Rounds: {count}</Text>
      </View>
      <View style={styles.inputView}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.signInUser()}
        >
          <Text style={styles.loginBtnTxt}>Shot Stats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

class Statistics extends Component {
  constructor(props) {
    super(props);
    //this.dbRef = firebase.firestore().collection('users');
    this.dbRef = firebase.firestore();
    this.state = {
      email: "",
      password: "",
    };

    // this.signUpUser = this.signInUser.bind(this);
  }

  // signInUser(){
  //   const { fname, lname, email, password } = this.state;
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //   .then((result) =>{
  //     console.log(result);
  //     this.props.navigation.navigate('Home')
  //   }).catch((err) =>{
  //     Alert.alert("Please enter the correct login details!");
  //     console.log("error: ", err);
  //   });
  // }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Text >Handicap {count}</Text> */}
        <Stats />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 60,
    color: "#009933",
    marginBottom: 60,
  },
  inputView: {
    width: "100%",
    //borderColor: "grey",
    //borderStyle: "solid",
    //borderWidth: 1,
    //borderRadius: 10,
    height: 150,
    marginBottom: 10,
    justifyContent: "center",
    //padding: 20,
  },
  inputTextLgn: {
    height: 50,
    color: "black",
  },
  inputTextAdd: {},
  forgot: {
    color: "black",
    fontSize: 15,
    margin: 20,
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#009933",
    borderRadius: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  loginBtnTxt: {
    fontSize: 21,
    color: "white",
  },
  signUpText: {
    marginTop: 15,
    fontSize: 15,
  },
  textLabel: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Statistics;
