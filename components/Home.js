import "react-native-gesture-handler";
import React, { Component } from "react";
//import { getAuth, signOut } from "firebase/auth";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import firebase from "firebase";
import styles from "./componentStyles/homeStyle.js";

class Home extends Component {
  //method to sign out the current user
  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Rounds</Text>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => this.props.navigation.navigate("PastRounds")}
        >
          <Text style={styles.btnTxt}>Past Rounds</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => this.props.navigation.navigate("AddRound")}
        >
          <Text style={styles.btnTxt}>Add Round</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Profile</Text>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => this.props.navigation.navigate("Statistics")}
        >
          <Text style={styles.btnTxt}>Season Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => this.signOutUser()}
        >
          <Text style={styles.btnTxt}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default Home;
