import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import firebase from "../api/firebaseConfig";

// function sendData(item) {
//   const nav = useNavigation();
//   nav.navigate("Maps", {
//     itemId: item.id,
//   });
// }

function Users() {
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState([]);
  const dbRef = firebase.firestore();
  const navigation = useNavigation();

  // _onPressItem = (user) => {
  //   this.props.navigation.navigate("Maps");
  // };

  useEffect(() => {
    const subscriber = dbRef
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("rounds")
      .onSnapshot((querySnapshot) => {
        const rounds = [];
        querySnapshot.forEach((documentSnapshot) => {
          //console.log("the id", documentSnapshot.id);
          //console.log("te data", documentSnapshot.data());
          rounds.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setRounds(rounds);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={rounds}
      renderItem={({ item }) => (
        <View style={styles.itemView}>
          <TouchableOpacity
            // onPress={() => {
            //   sendData(item);
            // }}
            onPress={() => {
              console.log("The ids:", item.key);
              navigation.navigate("Maps", {
                id: item.key,
              });
            }}
          >
            <Text style={styles.textLabel}>Course: {item.course}</Text>
            <Text style={styles.textLabel}>ID: {item.itemId}</Text>
          </TouchableOpacity>
          <Text style={styles.parNum}>
            {item.score}/{item.par}
          </Text>
          <Text>Score/Par</Text>
          <Text>
            GIR: {item.gir}/{item.greens}
          </Text>
          <Text>
            FWH: {item.fwh}/{item.fairways}
          </Text>
          {/* <Button title="Update">Update</Button>
          <Button
            title="Delete"
            onPress={() => {
              navigation.navigate("Maps");
            }}
          >
            Delete
          </Button> */}
        </View>
      )}
    />
  );
}

class PastRounds extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore();
    this.state = {
      user: [],
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Users />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 60,
    color: "#009933",
    marginBottom: 60,
  },
  inputView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    width: "80%",
    marginLeft: 45,
    alignItems: "center",
    //justifyContent:"center",
    padding: 20,
  },
  textLabel: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
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
  columnView: {
    flex: 1,
    flexDirection: "column",
  },
  imageView: {
    alignItems: "center",
  },
  itemView: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  parNum: {
    fontSize: 30,
  },
});

export default PastRounds;
