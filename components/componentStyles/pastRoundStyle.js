import { StyleSheet } from "react-native";

const pastRoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  courseLabel: {
    fontSize: 27,
    fontWeight: "bold",
    color: "Black",
  },
  itemView: {
    flexDirection: "row",
    backgroundColor: "green",
    padding: 20,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  parNum: {
    fontSize: 45,
  },
  textLabels: {
    flexDirection: "row",
    color: "white",
    fontSize: 22,
  },
  trashIcon: {
    color: "#8a1c1c",
    paddingTop: 10,
  },
  // mapLink: {
  //   flex: 1,
  //   flexDirection: "row",
  // },
  col1: {
    width: "90%",
  },
  col2: {
    width: "10%",
  },
  starCon: {
    position: "absolute",
    bottom: 0,
  },
  starIcon: {
    color: "#dbc956",
  },
});

export default pastRoundStyles;
