//Importing a Component from a Library
import React, { Component } from 'react';
import * as firebase from "firebase";

import {
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View,
    Button,
    TouchableOpacity,
    AsyncStorage,
    Image

} from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class login extends Component {
    state = {
        email: "",
        password: "",
        errorMessage: null
    };

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Home'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    static navigationOptions = {
        headerShown: false,
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView backgroundColor="black">
                <View style={styles.container}>
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <View>
                        <Image style={{ width: 250, height: 250 }}
                            source={require('../../assets/ES_logo.png')}
                        />
                    </View>
                    <Text style={styles.welcome}>Login</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholderTextColor='white'
                        placeholder="Email address"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="Password"
                        placeholderTextColor='white'
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    ></TextInput>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.userBtn}
                            onPress={this.handleLogin}
                        >
                            <Text style={styles.btnTxt}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigate('Register')}
                        >
                            <Text style={{ color: '#fff', padding: 10 }}>DON'T HAVE AN ACCOUNT? SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View></ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    // "Login" scritta 
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: "#fff",
    },
    input: {
        borderColor: 'white',
        borderWidth: 1,
        width: "90%",
        padding: 15,
        marginBottom: 10,
        color: "#fff"
    },
    // Botton 
    userBtn: {
        backgroundColor: "#fff",
        padding: 15,
        width: "100%",
        borderRadius: 10,
    },
    btnTxt: {
        fontSize: 18,
        textAlign: "center"
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%"
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    }
});