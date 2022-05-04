
// Core Import
import React from 'react'
import { Component } from 'react'

// Import Functions
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


class PatchUserDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            userID:'',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
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
        .then((response) => {
            if(response.status === 200) { 
                return response.json(); 
            }

            else if (response.status === 404){ 
                throw "Not Found"; 
            }

            else if (response.status === 500){ 
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




// Space padding allows for the InputBoxes to be seperate from the Stack Navigator's Header,
    render() {
        
        const Stack = this.props.navigation;

        return (
            <ScrollView style = {styles.container}> 
                <View style = {styles.space}></View>

                <View>
                    <TextInput style = {styles.userInput} placeholder={'First Name'}  
                        onChangeText = {(firstName) => this.setState({firstName})} 
                        value={this.state.firstName} 
                        placeholderTextColor='grey' 
                    />

                    <View style = {styles.space}></View>


                    <TextInput style = {styles.userInput} placeholder={'Last Name'} 
                        onChangeText = {(lastName) => this.setState({lastName})} 
                        value={this.state.lastName}  
                        placeholderTextColor='grey'  
                    />

                    <View style = {styles.space}></View>

                    <TextInput style = {[styles.userInput]} placeholder={'Email'} 
                        onChangeText = {(email) => this.setState({email})} 
                        value={this.state.email} 
                        placeholderTextColor='grey'   
                    />

                    <View style = {styles.space}></View>

                    <TextInput style = {styles.userInput} placeholder={'Password'} secureTextEntry = {true} 
                        onChangeText = {(password) => this.setState({password})} 
                        value={this.state.password} 
                        placeholderTextColor='grey' 
                    />


                </View>    

                <View style={styles.space}></View>

               

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>

                <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => Stack.navigate('Home')}>
                    <Text style = {styles.patchDetailsButtonText}>Home</Text>
                </TouchableOpacity>
                
                   
                </View>


                <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
                <View style={{ flex: 1}}>


                <TouchableOpacity  style = {styles.patchDetailsButton} onPress={() => this.patchUserDetails()}>
                    <Text style = {styles.patchDetailsButtonText}>Update</Text>
                </TouchableOpacity>

                  
                  </View>
              </View>


            </ScrollView>
        );    
    }
}



// Stylesheet for Patching User Details
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
      padding: 12,
      borderRadius: 10,
      backgroundColor: '#4267B2',
    },
  
    patchDetailsButtonText: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 15,
    },
  });
  

export default PatchUserDetails;