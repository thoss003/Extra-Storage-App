//Importing a Component from a Library
import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Image

} from 'react-native';

import * as firebase from "firebase";

export default class Chat extends Component {

  state = {
    isFetching: false,
    users: []
  }
//call setState when you want to change the previous state.
  onRefresh() {
    this.setState({ isFetching: true }, function () { this.load() });
  }
  //'componentDidMount()' is invoked immediately after a component is mounted
  componentDidMount() {
    this.props.navigation.addListener('willFocus', this.load)
  }
  containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {

      if (list[i].email == obj.email) {
        return true;
      }
    }

    return false;
  }
  load = () => {
//call setState when you want to change the previous state.
    this.setState({ users: [] });
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', (val) => {

      let person = val.val();
      person.phone = val.key;
      console.log();


      if (global.userEmail != person.email) {

//call setState when you want to change the previous state.
        this.setState((prevState) => {
          return {

            users: [...prevState.users, person]
          }

        })


      }
    })
//call setState when you want to change the previous state.
    this.setState({ isFetching: false });
  }
  renderRow = ({ item }) => {
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={() => {

            this.props.navigation.navigate('ChatWithUser', item);
          }}
          style={styles.chatList}
        >
          <Text style={{ fontSize: 20 }}>{item.name}</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
  render() {

    return (
      <SafeAreaView>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 150, height: 150 }}
            source={require('../../assets/icon/chat2.png')} />
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Chat</Text>
        </View>
        <FlatList
          onRefresh={() => this.onRefresh()}
          data={this.state.users}
          refreshing={this.state.isFetching}
          renderItem={this.renderRow}
          keyExtractor={(item) => item.phone}
        />
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatList: {
    padding: 12,
    margin: 3,
    //borderBottomColor:"#ccc",
    borderBottomWidth: 2,
    backgroundColor: "#20B2AA",
    borderRadius: 10,
  }
})