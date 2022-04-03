/* 
  Krzysztof Dawid Tomaszewski - 18044535

  UserLogin screen, should load automatically upon registration, to double check the login information works.

  If request is successful, send HTTP response code 200 (success), else if failed, prompt user with Server Error code || 
  Bad Request (format or typo)

*/

// Core React 
import React from 'react';
import { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Functionality Imports
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';



class UserLogin extends Component {
    constructor (props) {
        super(props)
        this.state = {
            userID:'',
            email: '',
            password: '',
        };
    }

    // Similar to registration, except only email and pass is needed for user authentication
    onClickLogin = async() => {        
        let userCredentials = {
            email: this.state.email,
            password: this.state.password,
        };


    // POST request sent to Login with user input stringified to API standard
        return fetch('http://10.0.2.2:3333/api/1.0.0/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(userCredentials),
        })


    // HTTP response codes according to user input
        .then((server) => {
            if(server.status === 200) { return server.json(); }

            else if (server.status === 400){ throw "Incorrect Credentials"; }
            
            else if (server.status === 500) {throw "Server Error";}

            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })


    // AsyncStorage will use the session token, asociated with current user ID, once they sign in, it will keep it in memory for later authentication
        .then(async(serverResponseJSON) => {
            await AsyncStorage.setItem('@id', JSON.stringify(serverResponseJSON.id));

            await AsyncStorage.setItem('@session_token', serverResponseJSON.token);


            ToastAndroid.show("Welcome Back!",ToastAndroid.SHORT);
            this.props.navigation.navigate("Home");
        })


    // Prompt user with any errors in ToastAndroid popup
        .catch((error) => {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    };


    render() {

        const Stack = this.props.navigation;


        return (
            <ScrollView style = {styles.container}> 

                <View style={styles.paddingSpace}></View>

                <TextInput style = {styles.userInput} placeholder={'Email'} 
                    placeholderTextColor='#898F9C'
                    onChangeText = {(email) => this.setState({email})}
                    value={this.state.email}
                    keyboardType={'email-address'}
                />

                <View style = {styles.textInputSpace}></View>

                <TextInput style = {styles.userInput} placeholder={'Password'} 
                    placeholderTextColor='#898F9C'
                    secureTextEntry = {true} 
                    onChangeText = {(password) => this.setState({password})}
                    value={this.state.password}
                />


                <View style = {styles.spaceButton}></View>
                
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>

                <TouchableOpacity  style = {styles.submitButton} onPress={() => this.onClickLogin()}>
                    <Text style = {styles.buttonText}>Login!</Text>
                </TouchableOpacity>
                   
                </View>


                  <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
                  <View style={{ flex: 1}}>

                <TouchableOpacity style = {styles.submitButton} onPress={() => Stack.navigate('UserRegistery')}>
                    <Text style = {styles.buttonText}>Register!</Text>
                </TouchableOpacity>

                  
                  </View>
              </View>

            </ScrollView>
        );  
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    paddingSpace: {
      padding: 5,
    },

    textInputSpace: {
        padding: 5,
    },

    spaceButton: {
        padding:10,
      },

    userInput: {
      alignSelf: "center",
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: 'bold',
      height: 45,
      width: 300,
      backgroundColor: 'white',
      borderRadius: 10,
  },

  submitButton: {
    alignSelf: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#4267B2',
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
  }
});

export default UserLogin

