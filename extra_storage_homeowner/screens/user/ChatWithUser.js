//Importing a Component from a Library
import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  View,
  Dimensions,
  Text,
} from 'react-native';
//import a module located in a Different file
import styles from '../../constants/styles';
import * as firebase from 'firebase';
export default class ChatWithUser extends React.Component {
  constructor (props) {
    /*In JavaScript 'super' refers to the parent class constructor,
    if you want to use 'this' in a constructor, you have to call super first*/
    super (props);
    this.state = {
      person: {
        name: props.navigation.getParam ('name'),
        phone: props.navigation.getParam ('phone'),
      },
      textMessage: '',
      messageList: [],
    };
  }
  static navigationOptions = ({navigation}) => {
    return;
    {
      title: navigation.getParam ('name', null);
    }
  };
  componentDidMount () {

    firebase
      .database ()
      .ref ('messages')
      .child (global.userPhone)
      .child (this.state.person.phone)
      .on ('child_added', value => {
//call setState when you want to change the previous state.
        this.setState (prevState => {
          return {
            messageList: [...prevState.messageList, value.val ()],
          };
        });
      });
  }

  handleChange = key => val => {
//call setState when you want to change the previous state.
    this.setState ({[key]: val});
  };
  convertTime = time => {
    let d = new Date (time);
    let c = new Date ();
    let result = (d.getHours () < 10 ? '0' : '') + d.getHours () + ':';
    result += (d.getMinutes () < 10 ? '0' : '') + d.getMinutes ();
    if (c.getDay () !== d.getDay ()) {
      result = d.getDay () + ' ' + d.getMonth () + ' ' + result;
    }
    return result;
  };
  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let msgId = firebase
        .database ()
        .ref ('messages')
        .child (global.userPhone)
        .child (this.state.person.phone)
        .push ().key;
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: global.userPhone,
      };
      updates[
        'messages/' +
          global.userPhone +
          '/' +
          this.state.person.phone +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.person.phone +
          '/' +
          global.userPhone +
          '/' +
          msgId
      ] = message;
      firebase.database ().ref ().update (updates);
      this.setState ({textMessage: ''});
    }
  };
  renderRow = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '60%',
          alignSelf: item.from === global.userPhone ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === global.userPhone
            ? '#00897b'
            : '#7cb342',
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
          {item.message}
        </Text>
        <Text style={{color: '#eee', padding: 3, fontSize: 12}}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    );
  };
  render () {
    let {height, width} = Dimensions.get ('window');
    return (
      <SafeAreaView>
        <FlatList
          style={{padding: 10, height: height * 0.8}}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString ()}
        />
        <View style={{flexDirection: 'row', alignItems: 'center',marginHorizontal:5}}>
          <TextInput
            style={styles.input}
            value={this.state.textMessage}
            placeholder="Type message..."
            onChangeText={this.handleChange ('textMessage')}
          />
          <TouchableOpacity onPress={this.sendMessage} style={{paddingBottom:10,marginLeft:5}}>
            <Text style={styles.btnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}