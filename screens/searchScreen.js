import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import moment from "moment";
const { width, height } = Dimensions.get("window");
export default class SearchScreen extends Component {
  state = {
    query: "",
    list: [],
    text: ""
  };
  componentDidMount() {
    axios(`https://jobs.github.com/positions.json`).then(({ status, data }) => {
      this.setState({ list: data });
    });
  }

  onChange = text => {
    this.setState({ query: text });
  };
  submit = () => {
    const { query, text } = this.state;
    const queryString = query.trim();
    const locationString = text.trim();
    axios(
      `https://jobs.github.com/positions.json?description=${queryString}&location=${locationString}`
    ).then(({ status, data }) => {
      if (status === 200) {
        this.setState({ list: data });
      }
    });
    // if you want to clear the search term after user pressed the search button, uncomment below lines
    // this.textInput.clear();
    // this.textInputs.clear();
  };
  filteredArry = () => {
    const { list } = this.state;
    const newArry = [...list].sort(function(a, b) {
      const valA = a.location;
      const valB = b.location;
      if (valA > valB) return -1;
    });
    this.setState({ list: newArry });
  };
  filteredArrayByDate = () => {
    const { list } = this.state;
    const newArry = [...list].sort(function(a, b) {
      const valA = a.created_at;
      const valB = b.created_at;
      return moment(valA).format("X") - moment(valB).format("X");
    });
    this.setState({ list: newArry });
  };
  render() {
    return (
      <View style={{ marginBottom: 65 }}>
        <View style={styles.container}>
          <TextInput
            placeholder="Type your skills"
            underlineColorAndroid={"transparent"}
            onChangeText={text => this.onChange(text)}
            ref={input => {
              this.textInput = input;
            }}
            clearButtonMode="always"
            style={styles.inputBox}
          />
          <TextInput
            placeholder="Type your location"
            underlineColorAndroid={"transparent"}
            onChangeText={text => this.setState({ text })}
            ref={input => {
              this.textInputs = input;
            }}
            clearButtonMode="always"
            style={styles.inputBox}
          />
          <TouchableOpacity onPress={this.submit} style={styles.button}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <Text>
          {`Jobs Found`} : {this.state.list.length}
        </Text>
        <View style={styles.sortingContainer}>
          <TouchableOpacity onPress={this.filteredArry}>
            <Text>Sort By Location</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.filteredArrayByDate}>
            <Text>Sort By Date</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.list}
          key={({ item }) => item.id}
          renderItem={({ item }) => <List item={item} />}
        />
        <View style={{ marginTop: 80 }} />
      </View>
    );
  }
}

const List = ({ item }) => (
  <View style={styles.listContainer}>
    <Text style={{ color: "black" }}>{item.company}</Text>
    <Text style={{ color: "black", paddingVertical: 3 }}>{item.title}</Text>
    <Text style={{ color: "black", paddingVertical: 3 }}>{item.location}</Text>
  </View>
);

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  listContainer: {
    marginTop: 10,
    padding: 10,
    width: width - 40,
    height: 100,
    backgroundColor: "#ddd",
    borderRadius: 10
  },
  inputBox: {
    width: 250,
    borderRadius: 5,
    height: 45,
    paddingBottom: 10,
    backgroundColor: "#5B5D72",
    textAlign: "left",
    paddingLeft: 10,
    color: "white"
  },
  button: {
    width: 250,
    backgroundColor: "#5bc0de",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },
  sortingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
};
