import { StyleSheet } from "react-native";

const pastRoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  courseLabel: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  itemView: {
    //flexDirection: "row"
    backgroundColor: "green",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  parNum: {
    fontSize: 45,
  },

  icons: {
    //color: "#009933",
    //marginBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  mapLink: {
    flex: 1,
    flexDirection: "row",
  },
});

export default pastRoundStyles;
