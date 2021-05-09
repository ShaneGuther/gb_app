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
import { useRoute } from "@react-navigation/native";
import firebase from "../api/firebaseConfig";

var lat = "";
var lng = "";

function MapToCourse({ navigation, route }) {
  //   const [loading, setLoading] = useState(true);
  //   const [users, setUsers] = useState([]);
  const dbRef = firebase.firestore();
  //const nav = useNavigation();
  //const { itemId } = navigation.state.params.itemId;
  //const { id } = route?.params?.id;
  const id = navigation.route.params.id;

  //const { navigation } = this.props;
  //const itemId = navigation.getParam("itemId", "NO-ID");

  //retrieving data from firestore
  //   useEffect(() => {
  //     const subscriber = dbRef
  //       .collection("users")
  //       .doc(firebase.auth().currentUser.uid)
  //       .collection("rounds");
  //.doc(JSON.stringify(itemID));
  //.onSnapshot((querySnapshot) => {

  //     const users = [];
  //     querySnapshot.forEach((documentSnapshot) => {

  // lat = subscriber.data().lat;
  // lng = subscriber.data().lng;

  //users.push({
  //...documentSnapshot.data(),
  //key: documentSnapshot.id,
  //});

  //setUsers(users);
  //setLoading(false);
  //});
  //return () => subscriber();
  //}, []);

  //   return (
  //     <View style={styles.container}>
  //       <MapView
  //         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
  //         style={styles.map}
  //         initialRegion={{
  //           latitude: 37.78825,
  //           longitude: -122.4324,
  //           latitudeDelta: 0.0922,
  //           longitudeDelta: 0.0421,
  //         }}
  //       ></MapView>
  //     </View>
  //   );
  // }
}
class Maps extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore();
    this.state = {
      lat: "",
      lng: "",
      roundId: "",
      score: "",
      //markers: [],
    };
    //this.handlePress = this.handlePress.bind(this);
  }

  getData = () => {
    //console.log(
    this.dbRef
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("rounds")
      .doc(this.props.route?.params?.id)
      .get()
      .then((doc) => {
        console.log("document: ", doc.data());
      });

    //);
    //   .then((docSnapshot) => {
    //     console.log(docSnapshot.data());
    //   });
  };
  componentDidMount() {
    this.getData();
  }

  //     this.setState({
  //       markers: [
  //         ...this.state.markers,
  //         {
  //           latitude: 37.78825,
  //           longitude: -122.4324,
  //           coordinate: e.nativeEven.coordinate,
  //           cost: `$${getRandomInt(50, 300)}`,
  //         },
  //       ],
  //     });
  //   }
  render() {
    //console.log(this.state.score);
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          //onPress={this.handlePress}
        >
          <MapView.Marker
            coordinate={{
              latitude: 30.78825,
              longitude: -112.4324,
            }}
            title={"testing, marker"}
          />
        </MapView>
      </View>
      //   <SafeAreaView style={styles.container}>
      //     <MapToCourse />
      //     {/* <MapView
      //       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      //       style={styles.map}
      //       initialRegion={{
      //         latitude: 37.78825,
      //         longitude: -122.4324,
      //         latitudeDelta: 0.0922,
      //         longitudeDelta: 0.0421,
      //       }}
      //     ></MapView> */}
      //   /</SafeAreaView> */}
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
