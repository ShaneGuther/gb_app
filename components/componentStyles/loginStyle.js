import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 70,
    color: "#009933",
    marginBottom: 50,
  },
  inputView: {
    flexDirection: "row",
    width: "80%",
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    //padding: 20,
  },
  inputTextLgn: {
    flex: 1,
    height: 50,
    color: "black",
  },
  btnStyle: {
    width: "80%",
    backgroundColor: "#009933",
    borderRadius: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,

    shadowColor: "rgba(46, 45, 49, 0.8)",
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 15 },
  },
  btnTxt: {
    fontSize: 21,
    color: "white",
  },

  icons: {
    color: "#009933",
    padding: 10,
  },

  //login styles
  forgotLink: {
    color: "black",
    fontSize: 15,
    margin: 20,
  },
  signUpLink: {
    color: "blue",
    marginTop: 15,
    fontSize: 15,
  },
});

export default loginStyles;
