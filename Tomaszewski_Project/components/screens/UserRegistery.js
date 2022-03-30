/* 
  Krzysztof Dawid Tomaszewski - 18044535

  UserRegistry screen will load first, initalise state objects for user: Name, Surname, Email and Password, 
  then stringify the user input into a JSON object, send that using a POST request to localhost:3333/api/1.0.0/user. 
  If request is successful, send HTTP response code 201 (created), else if failed, prompt user with Server Error code || 
  Bad Request (format or typo)

*/

// Core React 
import React from 'react';
import { Component } from 'react';

// Functionality Imports
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';


// State constructor initalise variables as state objects for later user input 
class UserRegister extends Component {
    constructor (props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }

// Render objects on UserRegistry Screen (Main Screen if user is not signed in)   
    render() {
        return (
            <ScrollView style = {styles.container}>
            </ScrollView>
        );    
    }
}

const styles = StyleSheet.create({
    container: {
    },
});

export default UserRegister;