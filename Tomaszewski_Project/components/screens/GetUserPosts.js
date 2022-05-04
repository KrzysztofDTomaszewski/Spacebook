

// Core React 
import React from 'react';
import { Component } from 'react';

// Functionality Imports
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// State constructor initalise variables as state objects for later user input 
class GetUserPosts extends Component {
    constructor (props) {
        super(props)
        this.state = {
          userID: '',
          postText: '',
        };
      }

      componentDidMount(){
        this.getUserPosts();
    }

    // Component will tell how many posts the user has stored in array within the console.log in terminal.
    getUserPosts = async () => {
        
        const xAuthToken = await AsyncStorage.getItem('@session_token')
        const userID = await AsyncStorage.getItem('@id')

        console.log("Session Initiated/Ended " + xAuthToken)
        return fetch ('http://10.0.2.2:3333/api/1.0.0/user/'+ userID, {
            headers: {'Content-Type': 'application/json', 'X-Authorization': xAuthToken,},
        })
        .then((server) => {
            if (server.status === 200) { 
                return server.json(); 
            }

            else if (server.status === 404){ 
                throw "Not Found"; 
            }

            else if (server.status === 500){ 
                throw "Server Error"; 
            }

            else { 
                ToastAndroid.show(Error, ToastAndroid.SHORT); 
            }
        })
        .then((serverResponseJSON) => {
            console.log(serverResponseJSON)

            this.setState({
                userID: serverResponseJSON.user_id,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    requestUserPost  = async () => {
        let userCredentials = {
            user_id: this.state.userID
        };

        //Retireve User ID + session token from async storage for PATCH (Update) Request.
        const xAuthToken = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@id');

        return fetch('http://10.0.2.2:3333/api/1.0.0/user/'+ userID + '/post', {
            method: 'get',
            headers: {'Content-Type': 'application/json', 'X-Authorization': xAuthToken},
            body: JSON.stringify(userCredentials)
        })
        .then((response) => {
            if(response.status === 200) { 
                ToastAndroid.show("Success!",ToastAndroid.SHORT); 
            }
            else if (response.status === 400){ 
                throw "Bad Request"; 
            }

            else if (response.status === 500){ 
                throw "Server Error"; 
            }

            else { 
                ToastAndroid.show(Error, ToastAndroid.SHORT); 
            }
        })
        .catch((error) => {
            console.log(error);
        })
    };



// Render objects on UserRegistry Screen (Main Screen if user is not signed in)   
    render() {

      const Stack = this.props.navigation;

      return (
            <ScrollView style = {styles.container}>

              <Image style={styles.logo} source={require('../photos/Spacebook_Reg.png')} />
              
              <Text style = {styles.topText}>What would you like to say?</Text>

                    <View style = {styles.space}></View>

                    <Text style = {styles.userInputTwo} placeholder={'Enter text...'} 
                        onChangeText = {(postText) => this.setState({postText})} 
                        value={this.state.postText}  
                        placeholderTextColor='grey'  
                    />
                   


            <View style = {styles.spaceButton}></View>


              <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                      
                    <TouchableOpacity  style = {styles.submitButton} onPress={() => this.requestUserPost()}> 
                        <Text style = {styles.buttonText}>Get !</Text>
                    </TouchableOpacity>
                  </View>


                  <View style={{borderLeftWidth: 1, borderLeftColor: 'white'}}/>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity style = {styles.homeButton} onPress={() => Stack.navigate('Home')}>
                      <Text style = {styles.buttonText}>Home !</Text>
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
      padding: 3,
    }, 

    topText: {
        alignSelf: 'center',
        marginVertical: 10,
        fontSize: 14,
      },

    logo: {
      marginVertical: 5,
      alignSelf: 'center',
      resizeMode: 'stretch',
      height: 50,
      width: 85,
    },

    buttonSpace: {
      padding:5,
    },

    spaceButton: {
      padding:10,
    },
    
    userInput: {
      alignSelf: "center",
      fontSize: 13,
      height: 150,
      width: 300,
      backgroundColor: 'white',
      borderRadius: 5,
      marginVertical: 5,
  },

  userInputTwo: {
    alignSelf: "center",
    fontSize: 13,
    height: 35,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
},

  homeButton: {
    alignSelf: 'center',
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'grey',
  },

  submitButton: {
    alignSelf: 'center',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#4267B2',
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
  }
});

export default GetUserPosts;
