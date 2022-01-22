import "react-native-gesture-handler";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import firebase from "firebase";

class Home extends React.Component {
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
        <Text style={styles.areaTitles}>Rounds</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate("PastRounds")}
        >
          <Text style={styles.loginBtnTxt}>Past Rounds</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate("AddRound")}
        >
          <Text style={styles.loginBtnTxt}>Add Round</Text>
        </TouchableOpacity>
        <Text style={styles.areaTitles}>Profile</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate("Statistics")}
        >
          <Text style={styles.loginBtnTxt}>Season Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => this.signOutUser()}
        >
          <Text style={styles.loginBtnTxt}>Sign Out</Text>
        </TouchableOpacity>
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
  loginBtn: {
    width: "80%",
    backgroundColor: "#009933",
    borderRadius: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,

    shadowColor: "rgba(46, 45, 49, 0.8)",
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 15 },
  },
  loginBtnTxt: {
    fontSize: 21,
    color: "white",
  },
  areaTitles: {
    marginTop: 20,
    marginBottom: 13,
    fontSize: 30,
    fontWeight: "bold",
  },
  signOutBtn: {
    width: "40%",
    backgroundColor: "black",
    borderRadius: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    marginBottom: 30,

    shadowColor: "rgba(46, 45, 49, 0.8)",
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 15 },
  },
});

export default Home;
