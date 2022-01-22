import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";
import Home from "./components/Home";
import Login from "./components/Login";
import PastRounds from "./components/PastRounds";
import AddRound from "./components/AddRound";
import SignUp from "./components/SignUp";
import Statistics from "./components/Statistics";
import Maps from "./components/Maps";

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    //if user is not logged in, send to login navigation stack, else go to homepage
    if (!loggedIn) {
      return (
        <NavigationContainer>
          {
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  title: "Sign Up",
                  headerTintColor: "#009933",
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: "Home",
                  headerLeft: null,
                  headerTintColor: "#009933",
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="AddRound"
                component={AddRound}
                options={{
                  title: "Add Round",
                  headerTintColor: "#009933",
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="PastRounds"
                component={PastRounds}
                options={{
                  title: "Past Rounds",
                  headerTintColor: "#009933",
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="Statistics"
                component={Statistics}
                options={{
                  title: "Statistics",
                  headerTintColor: "#009933",
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="Maps"
                component={Maps}
                options={{
                  title: "Maps",
                  headerTintColor: "#009933",
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                }}
              />
            </Stack.Navigator>
          }
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        {
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "Home",
                headerLeft: null,
                headerTintColor: "#009933",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: "Sign Up",
                headerTintColor: "#009933",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="AddRound"
              component={AddRound}
              options={{
                title: "Add Round",
                headerTintColor: "#009933",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="PastRounds"
              component={PastRounds}
              navigator={navigator}
              options={{
                title: "Past Rounds",
                headerTintColor: "#009933",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Statistics"
              component={Statistics}
              options={{
                title: "Statistics",
                headerTintColor: "#009933",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Maps"
              component={Maps}
              navigator={navigator}
              options={{
                title: "Maps",
                headerTintColor: "#009933",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "bold",
                },
              }}
            />
          </Stack.Navigator>
        }
      </NavigationContainer>
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
    fontSize: 60,
    color: "#009933",
    marginBottom: 60,
  },
  inputView: {
    width: "80%",
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputTextLgn: {
    height: 50,
    color: "white",
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
  },
  loginBtnTxt: {
    fontSize: 21,
    color: "white",
  },
  signUpText: {
    marginTop: 15,
    fontSize: 15,
  },
  areaTitles: {
    marginTop: 20,
    marginBottom: 13,
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default App;
