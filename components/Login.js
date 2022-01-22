import "react-native-gesture-handler";
import React, { Component } from "react";
import Dialog from "react-native-dialog";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

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

        <Text style={styles.heading}>Golf Buddy</Text>
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
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.signInUser()}
        >
          <Text style={styles.loginBtnTxt}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <View>
            <Text style={styles.signUpText}>
              Don't have an account? Sign up!
            </Text>
          </View>
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
  },
  heading: {
    fontWeight: "bold",
    fontSize: 70,
    color: "#009933",
    marginBottom: 50,
  },
  // inputView: {
  //   width: "80%",
  //   borderColor: "grey",
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   height: 50,
  //   marginBottom: 20,
  //   justifyContent: "center",
  //   padding: 20,
  // },
  inputView: {
    flexDirection: "row",
    width: "80%",
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    //padding: 20,
  },
  inputTextLgn: {
    flex: 1,
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
  signUpText: {
    color: "blue",
    marginTop: 15,
    fontSize: 15,
  },
  icons: {
    color: "#009933",
    //marginBottom: 50,
    padding: 10,
  },
});

export default Login;
