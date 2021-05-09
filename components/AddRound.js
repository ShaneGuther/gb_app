import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  DatePickerAndroid,
  StatusBarIOS,
  TouchableNativeFeedbackBase,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  KeyboardAware,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import firebase from "../api/firebaseConfig";
import Animated from "react-native-reanimated";
import RNPickerSelect from "react-native-picker-select";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

class AddRound extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("users");
    this.state = {
      course: "",
      fairways: "",
      fwh: "",
      gir: "",
      greens: "",
      par: "",
      score: "",
      weather: "",
      created: "",
      lat: "",
      lng: "",
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeRound() {
    //Some conditionals to check if input is valid, will alert user and not submit if its not valid
    if (
      this.state.course === "" ||
      this.state.par === "" ||
      this.state.score === ""
    ) {
      Alert.alert("Course name, par and score are required!");
    } else if (this.state.greens > 18 || this.state.gir > 18) {
      Alert.alert("Greens/gir must be less than 18!");
    } else if (this.state.fairways > 18 || this.state.fwh > 18) {
      Alert.alert("Fairways/fairways hit must be less than 18!");
    } else {
      //gets the user id from the firebase authentication and adds the round data to that user's collection of rounds
      this.dbRef
        .doc(firebase.auth().currentUser.uid)
        .collection("rounds")
        .add({
          course: this.state.course,
          lat: this.state.lat,
          lng: this.state.lng,
          // location: new firebase.firestore.GeoPoint(
          //   this.state.lat,
          //   this.state.lng
          // ),
          fairways: this.state.fairways,
          fwh: this.state.fwh,
          gir: this.state.gir,
          greens: this.state.greens,
          par: this.state.par,
          score: this.state.score,
          weather: this.state.weather,
          created: firebase.firestore.Timestamp.now(),

          //resets the variable states to empty values and navigates out of the page
        })
        .then((res) => {
          this.setState({
            course: "",
            fairways: "",
            fwh: "",
            gir: "",
            greens: "",
            par: "",
            score: "",
            weather: "",
            lat: "",
            lng: "",
          });
          //this.props.navigation.navigate('Home')
          this.props.navigation.navigate("PastRounds");
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        style={styles.container}
      >
        <View style={styles.imageView}>
          <Image
            source={require("../assets/gcexample.png")}
            style={{ height: 200, width: 200 }}
          />
        </View>
        <View
          style={styles.columnView}
          //resetScrollToCoords={{x:0, y:0}}
          contentContainerStyle={styles.columnView}
          //scrollEnabled={false}
        >
          <View
            style={
              (styles.inputView, { zIndex: 200, justifyContent: "center" })
            }
          >
            <View styles={{ borderColor: "black", borderWidth: 2 }}>
              <Text style={styles.textLabel}>Course</Text>
              <GooglePlacesAutocomplete
                styles={{
                  container: {
                    //zIndex: 999,
                    borderColor: "green",
                    borderWidth: 2,
                    borderRadius: 10,
                    width: "90%",
                    alignitems: "center",
                    justifyContent: "center",
                  },
                  listView: {
                    backgroundColor: "white",
                    //position: 'absolute',
                    marginTop: 10,
                  },
                }}
                placeholder="Search... "
                fetchDetails={true}
                renderDescription={(row) => row.description}
                onPress={(data, details = null) => {
                  this.setState({
                    course: data.description,
                    lat: details.geometry.location.lat,
                    lng: details.geometry.location.lng,
                  });
                  console.log(details.geometry.location.lat);
                }}
                query={{
                  key: "AIzaSyBEDvsaazGPgtcp0EF11S4yIqV-HJQGK-M",
                  language: "en",
                }}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.textLabel}>Course Par</Text>
              <View style={styles.inputTextView}>
                <RNPickerSelect
                  style={styles.pickerStyle}
                  placeholder={{
                    label: "Par",
                    value: null,
                    color: "#9EA0A4",
                  }}
                  value={this.state.par}
                  onValueChange={(val) => this.inputValueUpdate(val, "par")}
                  //onValueChange={(value) => console.log(value)}
                  items={[
                    { label: "68", value: 68, color: "green" },
                    { label: "69", value: 69, color: "green" },
                    { label: "70", value: 70, color: "green" },
                    { label: "71", value: 71, color: "green" },
                    { label: "72", value: 72, color: "green" },
                    { label: "73", value: 73, color: "green" },
                    { label: "74", value: 74, color: "green" },
                  ]}
                  useNativeAndroidPickerStyle={false}
                ></RNPickerSelect>
              </View>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.textLabel}>Score</Text>
              <View style={styles.inputTextView}>
                <RNPickerSelect
                  style={styles.pickerStyle}
                  placeholder={{
                    label: "Score",
                    value: null,
                    color: "#9EA0A4",
                  }}
                  value={this.state.score}
                  onValueChange={(val) => this.inputValueUpdate(val, "score")}
                  //onValueChange={(value) => console.log(value)}
                  items={[
                    { label: "68", value: 68, color: "green" },
                    { label: "69", value: 69, color: "green" },
                    { label: "70", value: 70, color: "green" },
                    { label: "71", value: 71, color: "green" },
                    { label: "72", value: 72, color: "green" },
                    { label: "73", value: 73, color: "green" },
                    { label: "74", value: 74, color: "green" },
                  ]}
                  useNativeAndroidPickerStyle={false}
                ></RNPickerSelect>
              </View>
            </View>

            <View style={styles.inputView}>
              <Text style={styles.textLabel}>Greens in Regulation*</Text>
              <View style={styles.inputTextViewGIR}>
                <RNPickerSelect
                  style={styles.pickerStyle}
                  placeholder={{
                    label: "GIR",
                    value: null,
                    color: "#9EA0A4",
                  }}
                  value={this.state.gir}
                  onValueChange={(val) => this.inputValueUpdate(val, "gir")}
                  items={[
                    { label: "12", value: 12, color: "green" },
                    { label: "13", value: 13, color: "green" },
                    { label: "14", value: 14, color: "green" },
                    { label: "15", value: 15, color: "green" },
                    { label: "16", value: 16, color: "green" },
                    { label: "17", value: 17, color: "green" },
                    { label: "18", value: 18, color: "green" },
                  ]}
                  useNativeAndroidPickerStyle={false}
                ></RNPickerSelect>
              </View>
              {/* <View style={styles.inputTextViewGIR}>
                    <TextInput 
                    styles={styles.inputTextLgn}
                    keyboardType= 'numeric'
                    value={this.state.gir}
                    onChangeText={(val) => this.inputValueUpdate(val, 'gir')}
                    /> */}
              <Text style={styles.textLabelGIR}>/</Text>
              <View style={styles.inputTextViewGIR}>
                <RNPickerSelect
                  style={styles.pickerStyle}
                  placeholder={{
                    label: "Greens",
                    value: null,
                    color: "#9EA0A4",
                  }}
                  onValueChange={(val) => this.inputValueUpdate(val, "greens")}
                  //onValueChange={(value) => console.log(value)}
                  items={[
                    { label: "18", value: 18, color: "green" },
                    { label: "9", value: 9, color: "green" },
                  ]}
                  useNativeAndroidPickerStyle={false}
                ></RNPickerSelect>
              </View>
            </View>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.textLabel}>Fairways Hit*</Text>
            <View style={styles.inputTextViewGIR}>
              <TextInput
                styles={styles.inputTextLgn}
                keyboardType="numeric"
                value={this.state.fwh}
                onChangeText={(val) => this.inputValueUpdate(val, "fwh")}
              />
            </View>
            <Text style={styles.textLabelGIR}>/</Text>
            <View style={styles.inputTextViewGIR}>
              <TextInput
                styles={styles.inputTextLgn}
                keyboardType="numeric"
                value={this.state.fairways}
                onChangeText={(val) => this.inputValueUpdate(val, "fairways")}
              />
            </View>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.textLabel}>Weather*</Text>
            <View style={styles.inputTextView}>
              <TextInput
                styles={styles.inputTextLgn}
                value={this.state.weather}
                onChangeText={(val) => this.inputValueUpdate(val, "weather")}
              ></TextInput>
            </View>
          </View>
          <View style={styles.inputButtonView}>
            <TouchableOpacity
              title="Add Round"
              style={styles.loginBtn}
              onPress={() => this.storeRound()}
            >
              <Text style={styles.loginBtnTxt}>Add Round</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.optionalLabel}>* is optional</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inputView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    width: "80%",
    marginLeft: 45,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  inputButtonView: {
    alignItems: "center",
  },
  textLabel: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
  },
  textLabelGIR: {
    fontSize: 20,
    margin: 3,
  },
  inputTextView: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    width: "20%",
    height: 50,
    padding: 5,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  inputTextViewCourse: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    width: "40%",
    paddingBottom: 10,
    height: 40,
    padding: 5,
    color: "black",
    fontSize: 40,
    alignItems: "center",
    alignItems: "stretch",
  },
  inputTextViewGIR: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    width: "20%",
    height: 30,
    padding: 5,
    alignContent: "stretch",
  },
  inputTextLgn: {
    flex: 1,
    height: 50,
    width: "100%",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
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
  pickerStyle: {
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  optionalLabe: {
    flex: 1,
    fontSize: 10,
  },
});

export default AddRound;
