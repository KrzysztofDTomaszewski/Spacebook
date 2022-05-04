
// Core Import
import React from 'react'
import { Component } from 'react'

// Import Functions
import { Text, View, Image, StyleSheet, TextInput, ToastAndroid, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "react-native-image-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';

/* Account page will allow the user to see how other people can see the person's profile, eventually upload
    their own photo 
*/

class Account extends Component {
    constructor (props) {
        super(props)
        this.state = {
            userID: '',
            firstName: '',
            lastName: '',
            email: '',
            userProfilePhoto: '',
        };
    }

    componentDidMount(){
        this.getUserDetails();
    }

    getUserDetails = async () => {
        
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
                email: serverResponseJSON.email,  
                firstName: serverResponseJSON.first_name,
                lastName: serverResponseJSON.last_name,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    patchUserDetails  = async () => {
        let userCredentials = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        };

        //Retireve User ID + session token from async storage for PATCH (Update) Request.
        const xAuthToken = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@id');

        return fetch('http://10.0.2.2:3333/api/1.0.0/user/'+ userID, {
            method: 'patch',
            headers: {'Content-Type': 'application/json', 'X-Authorization': xAuthToken,},
            body: JSON.stringify(userCredentials)
        })
        .then((response) => {
            if(response.status === 200) { 
                this.props.navigation.navigate("Home");
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


    // Didn't find a good way to allow a user to select a photo from photos app or take one with phone and use it as a profile photo,
    // therefore I commented this code out for future 
    
    // postUserPhoto = async (obj) => {
    //     const userID = await AsyncStorage.getItem('@id')
    //     const xAuthToken = await AsyncStorage.getItem('@session_token')
    //     return fetch(
    //       "http://10.0.2.2:3333/api/1.0.0/user/" + userID + '/photo',
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "image/jpeg",
    //           "Content-Type": "image/png",
    //           "X-Authorization": xAuthToken,
    //         },
    //         body: this.state.userPhoto,
    //       }
    //     )
    //       .then((server) => {
    //         if (server.ok) {
    //           ToastAndroid.show('Photo Uploaded!', ToastAndroid.SHORT);
    //         }
    //       })
    
    //       .catch(function (error) {
    //         console.log(
    //           "There has been a problem with your fetch operation: " + error.message
    //         );
    //       });
    //   };
    
    //   getUserPhoto = async (obj) => {
    //     const userID = await AsyncStorage.getItem('@id')
    //     const xAuthToken = await AsyncStorage.getItem('@session_token')
    //     fetch(
    //         "http://10.0.2.2:3333/api/1.0.0/user/" + userID + '/photo',
    //       {
    //         method: "GET",
    //         headers: {
    //           Accept: "image/jpeg",
    //           Accept: "image/png",
    //           "X-Authorization": xAuthToken,
    //         },
    //       }
    //     )
    //       .then((response) => {
    //         if (response.ok) {
    //           console.log("OK.. getting photo"); 
    //         } else {
    //           console.log("No Photo found... ignore");
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };

    //   selectUserPhoto = async (obj) => {
    //     if (this.state.userProfilePhoto.uri == '') {
    //       ToastAndroid.show("Please pick photo", ToastAndroid.SHORT);
    //     } else {
    //       const options = { noData: true };

    //       ImagePicker.launchImageLibrary(options, (response) => {
    //         if (response.uri) {
    //           this.setState({
    //             userProfilePhoto: response,
    //           });
    
    //           this.postUserPhoto(obj);
    //         }
    //       });
    //     }
    //   };
    
    


/* 
  Space padding allows for the InputBoxes to be seperate from the Stack Navigator's Header,      
  Image for now is hard-coded, eventually, I need to implement a GET and POST method, which
  will allow the user to change the profile picture.
*/
    render() {
        
        const Stack = this.props.navigation;

        return (

            <ScrollView style = {styles.container}> 

                <View style = {styles.space}></View>

                <View>
                <Text style = {styles.photoLabel}>Profile Photo</Text>
                
                <Image style={styles.profilePhoto} source={require('../photos/profile.jpg')} />
                  
                  <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => this.getUserPhoto()}>
                      <Text style = {styles.patchDetailsButtonText}>Upload</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => this.postUserPhoto()}>
                      <Text style = {styles.patchDetailsButtonText}>Change</Text>
                    </TouchableOpacity>

                  </View>
               
            
                <Text style = {styles.textLabel}>First Name: </Text>

                    <TextInput style = {styles.userInput} placeholder={'First Name'}  
                        onChangeText = {(firstName) => this.setState({firstName})} 
                        value={this.state.firstName} 
                        placeholderTextColor='grey' 
                    />

                    <View style = {styles.space}></View>

                    <Text style = {styles.textLabel}>Last Name: </Text>

                    <TextInput style = {styles.userInput} placeholder={'Last Name'} 
                        onChangeText = {(lastName) => this.setState({lastName})} 
                        value={this.state.lastName}  
                        placeholderTextColor='grey'  
                    />

                    <View style = {styles.space}></View>

                    <Text style = {styles.textLabel}>Email: </Text>

                    <TextInput style = {[styles.userInput]} placeholder={'Email'} 
                        onChangeText = {(email) => this.setState({email})} 
                        value={this.state.email} 
                        placeholderTextColor='grey'   
                    />


              

               
                    

                </View>    

                <View style={styles.space}></View>

            </ScrollView>
        );    
    }
}



// Stylesheet for Patching User Details
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


    textInputSpace: {
         padding: 5,
    },

    profilePhoto: {
        marginVertical: 5,
        alignSelf: 'center',
        resizeMode: 'stretch',
        height: 60,
        width: 100,
        borderRadius: 100,
      },

    textLabel: {
        padding: 10,
        fontSize:  14,
        fontWeight: 'bold',
    },

    photoLabel: {
        alignSelf: 'center',
        fontWeight: 'bold',
    },

    space: {
        padding: 5,
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
    patchDetailsButton: {
      alignSelf: 'center',
      padding: 4,
      borderRadius: 5,
      marginRight: 60,
      backgroundColor: '#4267B2',
    },
  
    patchDetailsButtonText: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 12,
    },
  });
  

export default Account;