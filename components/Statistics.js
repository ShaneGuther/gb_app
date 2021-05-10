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
import firebase from "firebase";

//globabl variables for calculating scoring average
var count = 0;
var totalPar = 0;
var totalScore = 0;
var averageScore = 0;
var scoreMsg = "";

//Function to retrieve data from firestore and calculate player statistics
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
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        averageScore = totalScore - totalPar;
        averageScore /= count;

        if (averageScore > 0) {
          averageScore = Math.round(Math.abs(averageScore));
          scoreMsg = `+${averageScore}`;
        } else if (averageScore < 0) {
          averageScore = Math.round(Math.abs(averageScore));
          scoreMsg = `-${averageScore}`;
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
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.textHeading}>Average </Text>
        <Text style={styles.textLabel}>{scoreMsg}</Text>
        <Text style={styles.textHeading}>Total Rounds </Text>
        <Text style={styles.textLabel}>{count}</Text>
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnTxt}>Club Distances</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.dbRef = firebase.firestore();
  }

  render() {
    return <Stats />;
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
    height: "50%",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    //padding: 20,
  },
  inputTextLgn: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "80%",
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
    color: "yellow",
  },
  signUpText: {
    marginTop: 15,
    fontSize: 15,
  },
  textLabel: {
    flex: 1,
    fontSize: 60,
    fontWeight: "bold",
    color: "green",
  },
  textHeading: {
    flex: 1,
    fontSize: 40,
    //fontWeight: "bold",
    color: "black",
    textDecorationLine: "underline",
  },
});

export default Statistics;
