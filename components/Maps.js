import "react-native-gesture-handler";
import React, { Component, useEffect, useState } from "react";
//import { MapView } from "expo";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "../api/firebaseConfig";

class Maps extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore();
    this.state = {
      lat: "",
      lng: "",
      course: "",
      score: "",
    };
  }

  getData = () => {
    this.dbRef
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("rounds")
      .doc(this.props.route?.params?.id)
      .get()
      .then((doc) => {
        this.setState({
          lat: doc.data().lat,
          lng: doc.data().lng,
          course: doc.data().course,
        });
        console.log("document: ", doc.data());
        console.log("lat: ", Number(doc.data().lat));
        console.log("lng: ", Number(doc.data().lng));
      });
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: Number(this.state.lat),
            longitude: Number(this.state.lng),
            latitudeDelta: 0.2122,
            longitudeDelta: 0.2321,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: Number(this.state.lat),
              longitude: Number(this.state.lng),
            }}
            title={this.state.course}
          />
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    //height: 400,
    //width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
