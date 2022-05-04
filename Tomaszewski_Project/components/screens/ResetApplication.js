// Core Import
import React from 'react'
import { Component } from 'react'

// Import Functions
import { Text, View, StyleSheet, ToastAndroid, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


/* Class component will resample and reset the database columns within localhost:3333 (Mudfoot instance)
 As stated within Swagger.IO, sending POST to /reset && /resample will exec the following server commands. */
 
class ResetApplication extends Component {
  postResetAPI () {
    fetch('http://10.0.2.2:3333/api/1.0.0/reset', {
      method: 'POST'
    })
      .then((server) => {
        if (server.ok) {
          console.log('Waring, database has been reset! All users have been removed')
          ToastAndroid.show('All Data Removed!', ToastAndroid.SHORT)
          AsyncStorage.clear()
          this.props.navigation.navigate('UserRegistery')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  postResampleAPI () {
    fetch('http://10.0.2.2:3333/api/1.0.0/resample', {
      method: 'POST'
    })
      .then((server) => {
        if (server.ok) {
          console.log('Warning, database has been resampled!')
          ToastAndroid.show('All data has been resampled! ', ToastAndroid.SHORT)
          this.props.navigation.navigate('Home')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
        
    const Stack = this.props.navigation;

    return (
        <ScrollView style = {styles.container}> 

      
      <View style = {styles.spaceButton}></View>


            <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                  <Text style = {styles.headerText}>WARNING, Removes all user data!!!</Text>
                  <View style = {styles.spaceButton}></View>
                  <TouchableOpacity style = {styles.resetButton} onPress={() => this.postResetAPI()}>
                <Text style = {styles.buttonText}>Reset ALL Data!</Text>
            </TouchableOpacity>
            </View>


            <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
                <View style={{ flex: 1 }}>
                  <Text style = {styles.headerText}>Resample will be necessary in POSTMAN!</Text>
                  <View style = {styles.spaceButton}></View>
                  <TouchableOpacity style = {styles.resetButton} onPress={() => this.postResampleAPI()}>
                    <Text style = {styles.buttonText}>Resample All Data!</Text>
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
        padding: 5,
    },

    textInputSpace: {
         padding: 5,
    },
    textLabel: {
        padding: 10,
        fontSize:  18,
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
    resetButton: {
     
      alignSelf: 'center',
      padding: 12,
      borderRadius: 5,
      backgroundColor: '#4267B2',
    },

    buttonText: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 15,
    },

    spaceButton: {
      padding:10,
    },
  
  });

export default ResetApplication;