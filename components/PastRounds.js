import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  InteractionManager,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import firebase from "../api/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

function Users() {
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState([]);
  const dbRef = firebase.firestore();
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = dbRef
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("rounds")
      .onSnapshot((querySnapshot) => {
        const rounds = [];
        querySnapshot.forEach((documentSnapshot) => {
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
          <View style={styles.courseView}>
            <View style={styles.mapLink}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Maps", {
                    id: item.key,
                  });
                }}
              >
                <Text style={styles.textLabel}>{item.course}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Maps", {
                    id: item.key,
                  });
                }}
              >
                <Ionicons name="globe" style={styles.icons} size={30} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={({ justifyContent: "center" }, styles.parNum)}>
              <Text style={{ color: "white" }}>{item.score}</Text>/{item.par} (
              {item.score - item.par > 0 ? "+" : ""}
              {item.score - item.par})
            </Text>
          </View>
          <Text style={{ color: "white", fontSize: 30 }}>
            GIR:{" "}
            <Text style={{ color: "black" }}>
              {item.gir}/{item.greens}
            </Text>
          </Text>
          <Text style={{ color: "white", fontSize: 30 }}>
            FWH:{" "}
            <Text style={{ color: "black" }}>
              {item.fwh}/{item.fairways}
            </Text>
          </Text>
          <Text style={{ color: "white", fontSize: 30 }}>
            Notes: <Text style={{ color: "black" }}>{item.weather}</Text>
          </Text>
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
    padding: 20,
  },
  textLabel: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  // loginBtn: {
  //   width: "80%",
  //   backgroundColor: "#009933",
  //   borderRadius: 10,
  //   height: 60,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 10,
  //   marginBottom: 30,
  // },
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
    //flexDirection: "row"
    backgroundColor: "green",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  parNum: {
    fontSize: 45,
  },
  icons: {
    //color: "#009933",
    //marginBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  courseView: {
    flex: 1,
  },
  mapLink: {
    flex: 1,
    flexDirection: "row",
  },
});

export default PastRounds;
