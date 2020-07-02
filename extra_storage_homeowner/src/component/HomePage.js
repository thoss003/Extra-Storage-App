//Importing a Component from a Library
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  Image

}
  from 'react-native';

import * as firebase from "firebase";

export default class Homepage extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }

  state = { currentUser: null }
//'componentDidMount()' is invoked immediately after a component is mounted
  componentDidMount() {
    const { currentUser } = firebase.auth();
    const user = firebase.auth().currentUser;

    global.user = user;
    global.userEmail = user.email;
    firebase
      .database()
      .ref('users')
      .orderByChild('email')
      .equalTo(global.userEmail)
      .on('value', snapshot => {
        let key = Object.keys(snapshot.val())[0];
        global.userPhone = snapshot.toJSON()[key].phoneNumber;

      });

//call setState when you want to change the previous state.
    this.setState({ currentUser });
  }

  render() {

    const { currentUser } = this.state
    const { navigate } = this.props.navigation;
    return (

      <ScrollView style={styles.container}>

        <View style={styles.top}>
          <Image
            style={{ width: 250, height: 250 }}
            source={require('../../assets/ES_logo.png')} />
        </View>

        <View style={styles.center}>
        
          {/* 1 */}
          <View style={styles.centerItem}>
            <View style={styles.centerItemInner}>
              <TouchableOpacity onPress={() => navigate('AddStorageScreen')}>
                <Image style={styles.itemIcon}
                  source={require('../../assets/icon/add-space.png')} />
                <Text textAlign="center">      ADD</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 2 */}
          <View style={styles.centerItem}>
            <View style={styles.centerItemInner}>
              <TouchableOpacity onPress={() => navigate('UserProductsScreen')}>
                <Image style={styles.itemIcon}
                  source={require('../../assets/icon/edit.png')} />

                <Text textAlign="center" >EDIT</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 3 */}

          <View style={styles.centerItem}>
            <View style={styles.centerItemInner}>
              <TouchableOpacity onPress={() => navigate('ProductsOverview')}>
                <Image style={styles.itemIcon}
                  source={require('../../assets/icon/008-checklist.png')} />
                <Text textAlign="center" >MY SPACES</Text>
              </TouchableOpacity>
            </View>
          </View>


          {/* 4 */}

          <View style={styles.centerItem}>
            <View style={styles.centerItemInner}>
              <TouchableOpacity onPress={() => navigate('Payment')}>
                <Image style={styles.itemIcon}
                  source={require('../../assets/icon/payment.png')} />
                <Text textAlign="center">PAYMENTS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  top: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  center: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 60,
    justifyContent: "space-between",
    shadowOpacity: 6.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 5,
    height: 400,
    margin: 20
  },
  centerItem: {
    width: Dimensions.get('window').width * 0.42,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center'

  },
  centerItemInner: {
    backgroundColor: 'white',
    margin: 10,
    width: '100%',
    height: 105,
    resizeMode: 'contain',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    alignItems: 'center'
  },
  bottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userBtn: {
    backgroundColor: "red",
    padding: 15,
    width: "100%",
    borderRadius: 10,
  },
  itemIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: 5
  }
})