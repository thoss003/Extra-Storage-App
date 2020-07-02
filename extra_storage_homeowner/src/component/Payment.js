//Importing a Component from a Library
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image

} from 'react-native';

import * as firebase from "firebase";

const Payment = props => {
  const [currentUser, setUser] = useState('');
  const [balance, setBalance] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    load();
    const unsubscribe = props.navigation.addListener('willFocus', () => {
      load();
      return unsubscribe;
    }, [props.navigation]);
  })
  const load = () => {
    setUser(firebase.auth());
    firebase.database().ref('users').orderByChild('phoneNumber').equalTo(global.userPhone).once('value', (snapshot) => {
      setName(snapshot.toJSON()[global.userPhone]['name']);

      setBalance(snapshot.toJSON()[global.userPhone]['balance']);
    });

  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={{ width: 100, height: 100 }}
          source={require('../../assets/icon/payment.png')} />
        <Text style={styles.txt}>{name} </Text>
        <Text style={styles.txt}>Balance: £ {balance}</Text>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({

  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "90%",
    height: 300,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    fontSize: 30,
    textAlign: 'center',
    color: "white"

  }
})
export default Payment;