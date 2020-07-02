//Importing a Component from a Library
import React, { Component } from 'react';
import * as firebase from "firebase";

import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  TouchableOpacity

} from 'react-native';

export default class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    errorMessage: null
  }
  writeUserData = (userId) => {
    firebase.database().ref('users/' + userId).set({
      name: this.state.name,
      email: this.state.email,
      balance: 0,
      phoneNumber: this.state.phone_number
      //some more user data
    });
  }
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('Login')
        var database = firebase.database();
        const user = firebase.auth().currentUser;

        this.writeUserData(this.state.phone_number);
      })
      //call setState when you want to change the previous state.
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView backgroundColor="black">
        <View style={styles.container}>

          <Text
            style={{
              color: 'white',
              alignItems: 'center',
              fontSize: 30
            }}>Signup</Text>
          <TextInput
            style={styles.input}
            placeholder='Name'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />

          <TextInput
            style={styles.input}
            placeholder='Phone Number'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={phone_number => this.setState({ phone_number })}
            value={this.state.phone_number}
          />

          <TouchableOpacity
            style={styles.userBtn}
            onPress={this.handleSignUp}>
            <Text style={styles.btnTxt}>Sign Up</Text>
          </TouchableOpacity>


          <View>
            <TouchableOpacity
              onPress={() => navigate('Login')}>
              <Text></Text>
              <Text style={{ color: '#fff', padding: 10 }}>Already a member? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'white',
    borderWidth: 1,
    width: '95%',
    height: 50,
    margin: 10,
    padding: 10,
    color: 'white',
    fontSize: 17,
    fontWeight: '300',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center"
  },
  userBtn: {
    backgroundColor: "#fff",
    padding: 15,
    width: "95%",
    borderRadius: 10,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  }
})