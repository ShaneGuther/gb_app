import "react-native-gesture-handler";
import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Marker from "react-native-maps";
import { View } from "react-native";
import firebase from "../api/firebaseConfig";
import styles from "./componentStyles/mapStyle";
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
        // console.log("document: ", doc.data());
        // console.log("lat: ", Number(doc.data().lat));
        // console.log("lng: ", Number(doc.data().lng));
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
          <Marker
            coordinate={{
              latitude: Number(this.state.lat),
              longitude: Number(this.state.lng),
            }}
            opacity={0.9}
            width={58}
            height={58}
            title={"Testtt"}
            description={"Desc"}
            pinColor={"red"}
          />
        </MapView>
      </View>
    );
  }
}

export default Maps;
