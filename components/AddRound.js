import "react-native-gesture-handler";
import React, { Component } from "react";
import { LogBox } from "react-native";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "../api/firebaseConfig";
import RNPickerSelect from "react-native-picker-select";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import styles from "./componentStyles/addRoundStyle";

//Couldn't find a way to fix the warning from having the google places autocomplete component inside a scrollview
LogBox.ignoreLogs(["VirtualizedLists"]);

//List to populate picker with values for each hole
let holeList = [
  { label: "0", value: 0, color: "green" },
  { label: "1", value: 1, color: "green" },
  { label: "2", value: 2, color: "green" },
  { label: "3", value: 3, color: "green" },
  { label: "4", value: 4, color: "green" },
  { label: "5", value: 5, color: "green" },
  { label: "6", value: 6, color: "green" },
  { label: "7", value: 7, color: "green" },
  { label: "8", value: 8, color: "green" },
  { label: "9", value: 9, color: "green" },
  { label: "10", value: 10, color: "green" },
  { label: "11", value: 11, color: "green" },
  { label: "12", value: 12, color: "green" },
  { label: "13", value: 13, color: "green" },
  { label: "14", value: 14, color: "green" },
  { label: "15", value: 15, color: "green" },
  { label: "16", value: 16, color: "green" },
  { label: "17", value: 17, color: "green" },
  { label: "18", value: 18, color: "green" },
];

//list of par values to populate picker
let parList = [
  { label: "68", value: 68, color: "green" },
  { label: "69", value: 69, color: "green" },
  { label: "70", value: 70, color: "green" },
  { label: "71", value: 71, color: "green" },
  { label: "72", value: 72, color: "green" },
  { label: "73", value: 73, color: "green" },
  { label: "74", value: 74, color: "green" },
];

class AddRound extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("users");
    this.state = {
      course: "",
      fairways: "0",
      fwh: "0",
      gir: "0",
      greens: "18",
      par: "68",
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
          fairways: this.state.fairways,
          fwh: this.state.fwh,
          gir: this.state.gir,
          greens: "18",
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
          this.props.navigation.navigate("Home");
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
        <View style={(styles.inputView, { zIndex: 200 })}>
          <View styles={styles.inputView}>
            <GooglePlacesAutocomplete
              styles={{
                container: {
                  borderColor: "green",
                  borderWidth: 2,
                  borderRadius: 5,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "5%",
                  width: "70%",
                  fontSize: 60,
                },
                listView: {
                  backgroundColor: "blue",
                  marginTop: 0,
                },
              }}
              placeholder="Course Name"
              fetchDetails={true}
              renderDescription={(row) => row.description}
              onPress={(data, details = null) => {
                let splitDesc = data.description.split(",");
                console.log("type: " + typeof splitDesc[0]);
                console.log("description: " + splitDesc[0]);

                //console.log(data.description[0]);
                this.setState({
                  course: splitDesc[0],
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                });
                // console.log("Details : ", details);
                // console.log("Data : ", data);
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
                placeholder={{}}
                items={parList}
                style={styles.pickerStyle}
                onValueChange={(val) => {
                  this.inputValueUpdate(val, "par");
                  //console.log(this.state.par);
                }}
                value={this.state.par}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.textLabel}>Score</Text>
            <View style={styles.inputTextView}>
              <TextInput
                styles={styles.inputTextLgn}
                keyboardType="numeric"
                value={this.state.score}
                onChangeText={(val) => this.inputValueUpdate(val, "score")}
              ></TextInput>
            </View>
          </View>

          <View style={styles.inputView}>
            <Text style={styles.textLabel}>GIR*</Text>
            <View style={styles.inputTextView}>
              <RNPickerSelect
                style={styles.pickerStyle}
                placeholder={{}}
                value={this.state.gir}
                onValueChange={(val) => this.inputValueUpdate(val, "gir")}
                items={holeList}
                useNativeAndroidPickerStyle={false}
              ></RNPickerSelect>
            </View>
            <Text style={styles.textLabelGIR}>/</Text>
            <View style={styles.inputTextView}>
              <Text>18</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.textLabel}>Fairways*</Text>
          <View style={styles.inputTextView}>
            <RNPickerSelect
              style={styles.pickerStyle}
              placeholder={{}}
              value={this.state.fwh}
              onValueChange={(val) => this.inputValueUpdate(val, "fwh")}
              //onValueChange={(value) => console.log(value)}
              items={holeList}
              useNativeAndroidPickerStyle={false}
            ></RNPickerSelect>
          </View>
          <Text style={styles.textLabelGIR}>/</Text>
          <View style={styles.inputTextView}>
            <RNPickerSelect
              style={styles.pickerStyle}
              placeholder={{}}
              onValueChange={(val) => this.inputValueUpdate(val, "fairways")}
              items={holeList}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.textLabel}>Notes*</Text>
          <View style={styles.inputTextViewNotes}>
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
      </KeyboardAwareScrollView>
    );
  }
}

export default AddRound;
