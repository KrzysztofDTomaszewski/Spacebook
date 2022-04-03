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
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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

      // POST API method, encapsulate user input && send to final values with JSON.Strigify method into /User endpoint
        onClickRegister = () => {
          let userCredentials = {
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              email: this.state.email,
              password: this.state.password,
          };


          return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
              method: 'post',
              headers: {'Content-Type': 'application/json',},
              body: JSON.stringify(userCredentials),
          })


          // HTTP Reponse Codes based on user input, 201 == Created, 400 Bad Request, 500 Server etc
          // Standard Android Toast short time frame pop up, to let user know that the request has reached the server
          .then((server) => {
              if(server.status === 201) { return server.json(); }

              else if (server.status === 400) { throw "Bad Request"; }
              
              else if (server.status === 500) {throw "Server Error"}

              else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
          })


          // Prompt User on bottom of App with AndroidToast popup
          .then((serverResponseJSON) => {


              ToastAndroid.show("Success!",ToastAndroid.SHORT);
              this.props.navigation.navigate("Home");
          })


          // Console log exceptions for debugging
          .catch((error) => {
              console.log(error);
          });
      };
      

// Render objects on UserRegistry Screen (Main Screen if user is not signed in)   
    render() {

      const Stack = this.props.navigation;

      return (
            <ScrollView style = {styles.container}>

              <Image style={styles.logo} source={require('../photos/Spacebook_Reg.png')} />
              
              <TextInput style = {styles.userInput} placeholder={'Name:'} 
                  onChangeText = {(firstName) => this.setState({firstName})} 
                  value={this.state.firstName} placeholderTextColor='#898F9C' 
              />

              <TextInput style = {styles.userInput} placeholder={'Surname:'} 
                  onChangeText = {(lastName) => this.setState({lastName})} 
                  value={this.state.lastName} placeholderTextColor='#898F9C'
              />
              

              <TextInput style = {styles.userInput} placeholder={'Email:'} 
                  onChangeText = {(email) => this.setState({email})} 
                  value={this.state.email} placeholderTextColor='#898F9C'
              />


              <TextInput style = {styles.userInput} placeholder={'Password:'} 
                  onChangeText = {(password) => this.setState({password})} 
                  value={this.state.password} placeholderTextColor='#898F9C'
                  secureTextEntry = {true} 
              />

             <View style = {styles.spaceButton}></View>


              <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>

                    <TouchableOpacity  style = {styles.submitButton} onPress={() => this.onClickRegister()}> 
                        <Text style = {styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                  </View>


                  <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
                  <View style={{ flex: 1}}>

                    <TouchableOpacity style = {styles.loginButton} onPress={() => Stack.navigate('UserLogin')}>
                      <Text style = {styles.buttonText}>Login</Text>
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
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: 'bold',
      height: 45,
      width: 300,
      backgroundColor: 'white',
      borderRadius: 5,
      marginVertical: 5,
  },

  submitButton: {
    alignSelf: 'center',
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'grey',
  },

  loginButton: {
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

export default UserRegister;
