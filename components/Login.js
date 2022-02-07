import "react-native-gesture-handler";
import React, { Component } from "react";
import Dialog from "react-native-dialog";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import styles from "./componentStyles/loginStyle";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      visible: false,
    };

    this.signUpUser = this.signInUser.bind(this);
  }

  componentDidMount() {
    (this.state.email = ""), (this.state.password = "");
  }

  //method to sign in a user
  signInUser = () => {
    const { fname, lname, email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.state.email = "";
        this.state.password = "";
        this.props.navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Please enter the correct login details!");
        console.log("error: ", err);
      });
  };

  //function to send a password reset email
  forgotPass = () => {
    this.handleSubmit();
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {})
      .catch((err) => {
        console.log("error: ", err);
      });
    this.setState({
      email: "",
    });
  };
  handleSubmit = () => {
    this.setState({
      visible: false,
    });
  };
  showPrompt = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Dialog.Container visible={this.state.visible}>
          <Dialog.Title>Password Reset</Dialog.Title>
          <Dialog.Description>
            Please enter your password recovery email
          </Dialog.Description>
          <Dialog.Input
            onChangeText={(text) => this.setState({ email: text })}
          ></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={() => this.handleSubmit()} />
          <Dialog.Button label="Submit" onPress={() => this.forgotPass()} />
        </Dialog.Container>

        <Text style={styles.title}>Golf Buddy</Text>
        <View style={styles.inputView}>
          <Ionicons name="ios-mail-sharp" style={styles.icons} size={20} />
          <TextInput
            style={styles.inputTextLgn}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <Ionicons name="ios-lock-closed" style={styles.icons} size={20} />
          <TextInput
            style={styles.inputTextLgn}
            placeholder="Password..."
            value={this.state.password}
            placeholderTextColor="#003f5c"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity onPress={() => this.showPrompt()}>
          <Text style={styles.forgotLink}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => this.signInUser()}
        >
          <Text style={styles.btnTxt}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <View>
            <Text style={styles.signUpLink}>
              Don't have an account? Sign up!
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default Login;
