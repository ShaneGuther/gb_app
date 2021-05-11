import "react-native-gesture-handler";
import React, { Component } from "react";
import { LogBox } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "../api/firebaseConfig";
import RNPickerSelect from "react-native-picker-select";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

//Couldn't find a way to fix the warning from having the google places autocomplete component inside a scrollview
LogBox.ignoreLogs(["VirtualizedLists"]);

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
        <View
          style={styles.columnView}
          contentContainerStyle={styles.columnView}
        >
          <View style={(styles.inputView, { zIndex: 200 })}>
            <View
              styles={
                (styles.inputView,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  borderColor: "black",
                  borderWidth: 2,
                  width: "100%",
                })
              }
            >
              <GooglePlacesAutocomplete
                styles={{
                  container: {
                    borderColor: "green",
                    borderWidth: 2,
                    borderRadius: 5,
                    marginLeft: "10%",
                    width: "80%",
                    fontSize: 60,
                  },
                  listView: {
                    backgroundColor: "white",
                    marginTop: 10,
                  },
                }}
                placeholder="Course Name"
                fetchDetails={true}
                renderDescription={(row) => row.description}
                onPress={(data, details = null) => {
                  this.setState({
                    course: data.description,
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
                  items={[
                    { label: "68", value: 68, color: "green" },
                    { label: "69", value: 69, color: "green" },
                    { label: "70", value: 70, color: "green" },
                    { label: "71", value: 71, color: "green" },
                    { label: "72", value: 72, color: "green" },
                    { label: "73", value: 73, color: "green" },
                    { label: "74", value: 74, color: "green" },
                  ]}
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
              <Text style={styles.textLabel}>Greens in Regulation*</Text>
              <View style={styles.inputTextViewGIR}>
                <RNPickerSelect
                  style={styles.pickerStyle}
                  placeholder={{}}
                  value={this.state.gir}
                  onValueChange={(val) => this.inputValueUpdate(val, "gir")}
                  items={[
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
                  ]}
                  useNativeAndroidPickerStyle={false}
                ></RNPickerSelect>
              </View>
              <Text style={styles.textLabelGIR}>/</Text>
              <View style={styles.inputTextViewGIR}>
                <Text>18</Text>
              </View>
            </View>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.textLabel}>Fairways Hit*</Text>
            <View style={styles.inputTextViewGIR}>
              <RNPickerSelect
                style={styles.pickerStyle}
                placeholder={{}}
                value={this.state.fwh}
                onValueChange={(val) => this.inputValueUpdate(val, "fwh")}
                //onValueChange={(value) => console.log(value)}
                items={[
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
                ]}
                useNativeAndroidPickerStyle={false}
              ></RNPickerSelect>
            </View>
            <Text style={styles.textLabelGIR}>/</Text>
            <View style={styles.inputTextViewGIR}>
              <RNPickerSelect
                style={styles.pickerStyle}
                placeholder={{}}
                onValueChange={(val) => this.inputValueUpdate(val, "fairways")}
                items={[
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
                ]}
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
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    width: "80%",
    marginLeft: 40,
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
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    width: "25%",
    height: 30,
    padding: 5,
    color: "black",

    justifyContent: "center",
    alignItems: "stretch",
  },
  inputTextViewGIR: {
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 2,
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
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "stretch",
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
    color: "yellow",
  },
  columnView: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
  },
  imageView: {
    alignItems: "center",
  },
  pickerStyle: {
    fontSize: 40,
    color: "black",
    paddingRight: 60,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 5,
  },
  optionalLabel: {
    flex: 1,
    fontSize: 10,
  },
  inputTextViewNotes: {
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    width: "45%",
    height: 30,
    padding: 5,
    color: "black",
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export default AddRound;
