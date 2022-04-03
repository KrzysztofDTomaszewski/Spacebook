/* 
  Krzysztof Dawid Tomaszewski - 18044535

  Home screen will load main app, once a user is either registered, or logged in.
  This page will allow the user to add friends, view existing friends as well as, 
  remove them and/or add profile photos to their own account.

*/

// Core Components
import React from 'react'
import { Component } from 'react'

// Function Components
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

class Home extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        
        const Stack = this.props.navigation;

        return (
          
            <ScrollView style = {styles.container}> 
                <Text style = {styles.headerText}>Welcome to Spacebook!</Text>
                

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>

                  <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => Stack.navigate('Account')}>
                    <Text style = {styles.patchDetailsButtonText}>Account</Text>
                  </TouchableOpacity>
                   
                </View>


                  <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
                  <View style={{ flex: 1}}>

                  <TouchableOpacity style = {styles.logoutButton} onPress={() => Stack.navigate('UserLogout')}>
                    <Text style = {styles.logoutButtonText}>Logout</Text>
                  </TouchableOpacity>

                  
                  </View>
              </View>

              <View style={styles.space}></View>

              <View style={{flexDirection: "row"}}>
                  <View style={{flex: 1}}>

                  <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => Stack.navigate('PatchUserDetails')}>
                    <Text style = {styles.patchDetailsButtonText}>Update Details</Text>
                  </TouchableOpacity>
                  
                </View>

              

                  <View style={{ flex: 1}}>

                  <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => Stack.navigate('PatchUserDetails')}>
                    <Text style = {styles.patchDetailsButtonText}>Add Friends</Text>
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
    },

    headerText: {
      alignSelf: 'center',
      fontWeight: 'bold',
      marginVertical: 15,
      fontSize: 20,
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

  logoutButton: {
    alignSelf: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#4267B2',
  },

  logoutButtonText: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white',
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

export default Home;
