import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { Component, useEffect, useState, useCallback } from "react";
import firebase from "../api/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles from "./componentStyles/pastRoundStyle";

function Rounds() {
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState([]);
  var [score, setScore] = useState(0);
  const dbRef = firebase.firestore();
  const navigation = useNavigation();

  useEffect(() => {
    dbRef
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("rounds")
      .onSnapshot((querySnapshot) => {
        const rounds = [];
        let lowestScore = -Infinity;
        querySnapshot.forEach((documentSnapshot) => {
          const tempScore =
            documentSnapshot.data().par - documentSnapshot.data().score;
          console.log("Temp score = " + tempScore);
          if (tempScore > lowestScore) {
            lowestScore = tempScore;
          }
          rounds.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setScore(lowestScore);
        console.log("Lowest score = " + lowestScore);
        setRounds(rounds);
        setLoading(false);
      });
  }, []);

  const onClick = useCallback((id) => {
    Alert.alert(
      "Delete round?",
      "You are about to delete a round, this cannot be reversed.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteRound(id) },
      ]
    );
  }, []);

  const deleteRound = useCallback((id) => {
    dbRef
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("rounds")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Round successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
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
            <TouchableOpacity
              style={styles.iconsTr}
              onPress={() => {
                onClick(item.key);
              }}
            >
              <Ionicons name="trash" style={styles.trashIcon} size={30} />
            </TouchableOpacity>
            <View style={styles.starCon}>
              {console.log(" item score " + (item.scor - item.par))}
              {console.log(" best score " + score)}
              {item.par - item.score == score ? (
                <AntDesign name="star" size={30} style={styles.starIcon} />
              ) : (
                <></>
              )}
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
        <Rounds />
      </SafeAreaView>
    );
  }
}

export default PastRounds;
