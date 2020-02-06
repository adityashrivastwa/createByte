import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Constants from "expo-constants";
import SearchScreen from "./screens/searchScreen";
import Header from "./screens/header";

console.disableYellowBox = true;
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#99ff99" barStyle="light-content" />
        <Header />
        <SearchScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  }
});
