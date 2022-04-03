/* 
  Krzysztof Dawid Tomaszewski - 18044535

  Home screen will load main app 

*/

// Core Components
import React from 'react'
import { Component } from 'react'

// Function Components
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

class Home extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        
        const Stack = this.props.navigation;

        return (
          
            <ScrollView style = {styles.container}> 


                <Text>Welcome to Spacebook!</Text>


                <TouchableOpacity style = {styles.submitButton} onPress={() => Stack.navigate('UserLogout')}>
                    <Text style = {styles.buttonText}>Logout</Text>
                </TouchableOpacity>


            </ScrollView>
      
        );    
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    space: {
      padding: 5,
    },

    lowerSpace: {
      padding: 12
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
  },

  submitButton: {
    alignSelf: 'center',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#4267B2',
  },

  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
  }
});

export default Home;
