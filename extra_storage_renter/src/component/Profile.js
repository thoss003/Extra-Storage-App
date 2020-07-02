//Importing a Component from a Library
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as firebase from "firebase";

const Profile = props => {

  const [currentUser, setUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [balance, setBalance] = useState('');
  const [products, setProducts] = useState('');

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
      setEmail(snapshot.toJSON()[global.userPhone]['email']);
      setPhone(snapshot.toJSON()[global.userPhone]['phoneNumber']);
      setBalance(snapshot.toJSON()[global.userPhone]['balance']);
    });
    firebase.database().ref('products').orderByChild('ownerId').equalTo(email).on('value', (snapshot) => {
      if (snapshot == null) {
        setProducts(0);
      }
      else {
        setProducts(snapshot.numChildren());
      }

    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={{ width: 150, height: 150 }}
          source={require('../../assets/icon/my-profile.png')} />
        <Text style={styles.welcome}>Profile</Text>
        <View style={styles.input}>
          <Text style={styles.txt}>Name: {name} </Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.txt}>Email: {email} </Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.txt}>Phone: {phone} </Text>
        </View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({

  card: {
    borderColor: 'white',
    borderWidth: 1,
    width: '85%',
    height: '75%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    width: '95%',
    height: 50,
    margin: 7,
    justifyContent: 'center',
    borderRadius: 10,
  },
  txt: {
    fontSize: 22,
    marginLeft: 10,
    color: "#fff",
  }
})
export default Profile;