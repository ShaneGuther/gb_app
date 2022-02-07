import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./componentStyles/loginStyle";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.signUpUser = this.signUpUser.bind(this);
  }

  signUpUser() {
    const { username, email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            username,
            email,
          });
        this.props.navigation.navigate("Home");
      })
      .catch((err) => {
        if (password.length < 6) {
          Alert.alert("Password must be at least 6 characters long!");
        } else {
          Alert.alert("Please correctly enter all fields!");
        }
        console.log("error: ", err);
      });
  }

  render() {
    return (
      // <KeyboardAwareScrollView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Golf Buddy</Text>
        <View style={styles.inputView}>
          <Ionicons name="ios-person-sharp" style={styles.icons} size={20} />
          <TextInput
            style={styles.inputTextLgn}
            placeholder="Username..."
            value={this.state.username}
            placeholderTextColor="#003f5c"
            onChangeText={(username) => this.setState({ username })}
          />
        </View>
        <View style={styles.inputView}>
          <Ionicons name="ios-mail-sharp" style={styles.icons} size={20} />
          <TextInput
            style={styles.inputTextLgn}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
        </View>
        <View style={styles.inputView}>
          <Ionicons name="ios-lock-closed" style={styles.icons} size={20} />
          <TextInput
            style={styles.inputTextLgn}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            textContentType="password"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => this.signUpUser()}
        >
          <Text style={styles.btnTxt}>Sign Up!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default SignUp;
