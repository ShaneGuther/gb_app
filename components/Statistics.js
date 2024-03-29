import "react-native-gesture-handler";
import React, { Component, useEffect, useState } from "react";
import { ActivityIndicator, Text, View, SafeAreaView } from "react-native";
import firebase from "firebase";
import styles from "./componentStyles/statisticsStyle";

//global variables for calculating scoring average
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
    //updating global variables to calculate relevant data later in hook
    totalPar = 0;
    totalScore = 0;
    averageScore = 0;
    count = 0;

    //getting the data from firestore and push to users array
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

        //calculating average score
        averageScore = totalScore - totalPar;
        averageScore /= count;

        //Condition statement for adding +/- on scoring average
        if (averageScore > 0) {
          averageScore = Math.round(Math.abs(averageScore));
          scoreMsg = `+${averageScore}`;
        } else if (averageScore < 0) {
          averageScore = Math.round(Math.abs(averageScore));
          scoreMsg = `-${averageScore}`;
        } else {
          scoreMsg = "Even";
        }
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
        <Text style={styles.heading}>Average </Text>
        <Text style={styles.stats}>{scoreMsg}</Text>
        <Text style={styles.heading}>Total Rounds </Text>
        <Text style={styles.stats}>{count}</Text>
      </View>
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

export default Statistics;
