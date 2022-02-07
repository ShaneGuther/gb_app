import { StyleSheet } from "react-native";

const statisticStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "100%",
    height: "50%",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    flex: 1,
    fontSize: 40,
    color: "black",
    textDecorationLine: "underline",
  },
  stats: {
    flex: 1,
    fontSize: 60,
    fontWeight: "bold",
    color: "green",
    paddingRight: 10,
  },
});

export default statisticStyles;
