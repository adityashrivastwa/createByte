import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Create Bytes </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 130,
    width,
    backgroundColor: "#99ff99"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.8
  }
};
