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
import { AntDesign } from "@expo/vector-icons";
import styles from "./componentStyles/pastRoundStyle";

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
          <View style={styles.col1}>
            <View style={styles.courseView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Maps", {
                    id: item.key,
                  });
                }}
              >
                <Text style={styles.courseLabel}>{item.course}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={({ justifyContent: "center" }, styles.parNum)}>
                <Text style={{ color: "white" }}>{item.score}</Text>/{item.par}{" "}
                ({item.score - item.par > 0 ? "+" : ""}
                {item.score - item.par})
              </Text>
            </View>
            <Text style={styles.textLabels}>
              GIR:{" "}
              <Text style={{ color: "black" }}>
                {item.gir}/{item.greens}
              </Text>
            </Text>
            <Text style={styles.textLabels}>
              FWH:{" "}
              <Text style={{ color: "black" }}>
                {item.fwh}/{item.fairways}
              </Text>
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textLabels}>
                {/* TO DO:
                  3 icons at the bottom instead of notes
                  Note icon - globe icon - delete icon
                  maybe change placement
            */}
                Notes: <Text style={{ color: "black" }}>{item.weather}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.col2}>
            <TouchableOpacity
              style={styles.iconsTr}
              onPress={() => {
                navigation.navigate("Maps", {
                  id: item.key,
                });
              }}
            >
              <Ionicons name="globe" style={styles.icons} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconsTr} onPress={() => {}}>
              <Ionicons name="trash" style={styles.trashIcon} size={30} />
            </TouchableOpacity>
            <View style={styles.starCon}>
              <AntDesign name="star" size={30} style={styles.starIcon} />
            </View>
          </View>
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

export default PastRounds;
