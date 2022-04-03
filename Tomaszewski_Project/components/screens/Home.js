/* 
  Krzysztof Dawid Tomaszewski - 18044535

  Home page will serve as the main page where user can add friends, change his profile photo,
  check friendslist and remove/update information stored.

*/

// Core React 
import React from 'react'
import { Component } from 'react'

// Functionality Imports
import { Text, StyleSheet, ScrollView } from 'react-native'


// App wrapped in scrollview due to lenghty functions

class Home extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        
        const Stack = this.props.navigation;

        return (
            <ScrollView style = {styles.container}> 


                <Text>Test</Text>





            </ScrollView>
            
        );    
    }
}

// Stylesheet for Home
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

});

export default Home;