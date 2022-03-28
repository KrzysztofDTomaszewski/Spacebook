import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
        id: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
  }

  handleNameInput = (name) => {
    // Following input is set into state for variable email.
    this.setState({name: name})
  }

  handleSurnameInput = (surname) => {
    // Following input is set into state for variable email.
    this.setState({surname: surname})
  }


  handleEmailInput = (email) => {
    // Following input is set into state for variable email.
    this.setState({email: email})
  }


  handlePassInput = (pass) => {
    // Following input is set into state for variable password, for later re-use and JSON Stringify POST requests.
    this.setState({password: pass})
  }

  signUp =  () => {
    // Console log current state
      console.log(this.state);
      console.log("Works");

  }

  render() {
    return (
    <View>
        <ScrollView>
            <Text style={styles.title}>Create an account</Text>
            <View style={styles.formItem}>         
     
                <TextInput 
                    placeholder='Enter Name:' 
                    onChangeText={this.handleNameInput} 
                    value={this.state.pass} 
                />
                
                <TextInput 
                    placeholder='Enter Surname:' 
                    onChangeText={this.handleSurnameInput} 
                    value={this.state.pass} 
                />

                <TextInput 
                    placeholder='Enter Email:' 
                    onChangeText={this.handleEmailInput} 
                    value={this.state.email} 
                    textContentType={'emailAddress'}
                />

                <TextInput 
                    placeholder='Enter Password:' 
                    onChangeText={this.handlePassInput} 
                    value={this.state.pass} 
                    secureTextEntry={true}
                />

                <Button 
                    onPress={this.signUp}
                    title="Submit Form"  
                />

            </View>
        </ScrollView>
    </View>
    );
  }

}

const styles = StyleSheet.create({
    title: {
        padding: 10,
        fontSize: 20,
        alignSelf: 'center',
    },
    loginText: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        marginTop: 10
    },

    submitButton: {
        height: 40,
        marginTop: 10
    },
    formItem: {
      padding: '10%',
      backgroundColor: 'white',
    },
});

export default Login