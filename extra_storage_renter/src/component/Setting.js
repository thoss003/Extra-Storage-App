//Importing a Component from a Library
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View,
    TouchableOpacity,
    Image
    
} from 'react-native';

import * as firebase from "firebase";

export default class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPassword:'',
      newPassword:'',
      reNewPassword:'',
      errorMsg:'',
      newName:''
    };
  }
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
  changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        //call setState when you want to change the previous state.
        this.setState({errorMsg:'Passwords successfully updated'});
      }).catch((error) => {this.setState({errorMsg:error.toString()}); });
    }).catch((error) => { this.setState({errorMsg:error.toString()}); });
  }
  //'componentDidMount()' is invoked immediately after a component is mounted
  componentDidMount() {

  }
  changePasswordHandler=()=>{
  if(this.state.currentPassword!='' && this.state.newPassword!='' && this.state.reNewPassword!='')
  {
    if(this.state.newPassword==this.state.reNewPassword){
      this.changePassword(this.state.currentPassword,this.state.newPassword);
    }
    else
    {
      this.setState({errorMsg:'Passwords do not match'});
    }
  }
  else
  { 
    this.setState({errorMsg:'One or more fields are empty'})
  }
  }
  changeNameHandler = () =>
  {if(this.state.newName!='')
  {
    firebase.database().ref('users/' + user.uid).update({
      name:this.state.newName,
    }).then(()=>{this.setState({errorMsg:'Name successfully updated'});
  }).catch((error)=>{this.setState({errorMsg:error.toString()});}); 
  }
else{
  this.setState({errorMsg:'Enter a name first'});
}
}
  render() {
    const { currentUser } = this.state
    const { navigate } = this.props.navigation;

    return (
      <ScrollView backgroundColor="black">
      <View style={styles.container}>
       <View style={styles.card}>
       <Image style={{width:100, height: 100}}
        source={require('../../assets/icon/settings.png')}/>
     
        <Text style={{fontSize:30,textAlign:'center', color:'white'}}>Settings</Text>
    <Text style={{color:'red'}}>{this.state.errorMsg}</Text>
    <TextInput
 
          style={styles.txt}
          placeholder="Enter new name"
          placeholderTextColor='white'
          onChangeText={(newName) => this.setState({newName})}
          value={this.state.newName}
        />
        <TouchableOpacity 
        style={styles.button}
            onPress={()=>this.changeNameHandler()}>
            <Text style={styles.btnTxt}>Change Name</Text>
          </TouchableOpacity>
        <TextInput
        secureTextEntry={true}
          style={styles.txt}
          placeholder="Enter current password"
          placeholderTextColor='white'
          onChangeText={(currentPassword) => this.setState({currentPassword})}
          value={this.state.currentPassword}
        />
        <TextInput
        secureTextEntry={true}
          style={styles.txt}
          placeholder="Enter new password"
          placeholderTextColor='white'
          onChangeText={(newPassword) => this.setState({newPassword})}
          value={this.state.newPassword}
        />
        <TextInput
        secureTextEntry={true}
          style={styles.txt}
          placeholder="Re-enter new password"
          placeholderTextColor='white'
          onChangeText={(reNewPassword) => this.setState({reNewPassword})}
          value={this.state.reNewPassword}
        />
          <TouchableOpacity 
          style={styles.button}
            onPress={()=>this.changePasswordHandler()}>
            <Text style={styles.btnTxt}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} 
          onPress={() => navigate('Login')}>
            <Text style={styles.btnTxt}>Logout</Text>
          </TouchableOpacity>

      </View>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  card:{
    borderWidth: 1,
    width: '100%',
    height: '90%',
    marginTop: 40,
    padding: 10,
    borderRadius:10,
    alignItems: 'center',
    justifyContent:"center",
    color:'#ffff33',
 },
  button:
  {
   alignSelf:'center',
   backgroundColor: "#fff",
   padding:10,
   margin:10,
   width:"90%",
   borderRadius:10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
  },
  btnTxt: {
    fontSize: 20,
    textAlign: "center",
  },
  txt: {
    borderColor: 'white',
    borderWidth: 1,
    width: "90%",
    padding :15,
    marginBottom: 10,
    color:"#fff",
    borderRadius:10,
  }
})