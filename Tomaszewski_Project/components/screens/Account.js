
// Core Import
import React from 'react'
import { Component } from 'react'

// Import Functions
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, ToastAndroid, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


class Account extends Component {
    constructor (props) {
        super(props)
        this.state = {
            userID:'',
            firstName: '',
            lastName: '',
            email: '',
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
            if(response.status === 200) { return response.json(); }

            else if (response.status === 404){ throw "Not Found"; }

            else if (response.status === 500){ throw "Server Error"; }

            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
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



// Space padding allows for the InputBoxes to be seperate from the Stack Navigator's Header,
    render() {
        
        const Stack = this.props.navigation;

        return (

            <ScrollView style = {styles.container}> 

                <View style = {styles.space}></View>

                <View>
                <Text style = {styles.photoLabel}>Profile Photo</Text>
                <Image style={styles.profilePhoto} source={require('../photos/profile.jpg')} />

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
        fontSize:  18,
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
  });
  

export default Account;