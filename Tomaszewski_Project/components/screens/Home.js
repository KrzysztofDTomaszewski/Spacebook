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
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

class Home extends Component {
    constructor (props) {
        super(props)
    }


    // Stringify user input and send it to /user/{user_id}/post
    postMSG() {
      console.log(error);
    }

    render() {
        
        const Stack = this.props.navigation;

        return (
          
            <ScrollView style = {styles.container}> 
                
                
                <Text style = {styles.topText}>Hi, welcome to your home page! Below are the main functinalities of the app, each button
                will take you into the correct page. </Text>

              <View style={styles.space}></View>
              <View style={styles.space}></View>


                

                <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => Stack.navigate('Account')}>
                    <Text style = {styles.patchDetailsButtonText}>Your Account</Text>
                  </TouchableOpacity>
                </View>


                  <View style={{ borderLeftWidth: 1, borderLeftColor: 'white' }}/>
                  <View style={{ flex: 1}}>
                    <TouchableOpacity style = {styles.logoutButton} onPress={() => Stack.navigate('UserLogout')}>
                      <Text style = {styles.logoutButtonText}>Log Out</Text>
                    </TouchableOpacity>
                  </View>
              </View>



              <View style={styles.space}></View>
              <View style={styles.space}></View>

              <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                  <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => Stack.navigate('PatchUserDetails')}>
                    <Text style = {styles.patchDetailsButtonText}>Update Details</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.space}></View>

             <View style={{flex: 1}}>
                <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => Stack.navigate('ResetApplication')}>
                   <Text style = {styles.patchDetailsButtonText}>Reset Application</Text>
                </TouchableOpacity>
                </View>
              </View>

              <View style={styles.space}></View>
              <View style={styles.space}></View>

              <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => Stack.navigate('UserPosts')}>
                   <Text style = {styles.patchDetailsButtonText}>Send Post</Text>
                </TouchableOpacity>
                </View>

                <View style={{flex: 1}}>
                <TouchableOpacity style = {styles.patchDetailsButton} onPress={() => Stack.navigate('GetUserPosts')}>
                   <Text style = {styles.patchDetailsButtonText}>Get Posts</Text>
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

    postBox : {
      color: '#111',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 13,
      height: 300,
      width: 300,
      marginVertical: 15,
      padding: 10,
      backgroundColor: '#ccc',
      borderRadius: 10
    },

    topText: {
      padding: 7,
      alignSelf: 'center',
      marginVertical: 10,
      fontSize: 14,
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

  postBoxButton: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#5c5c5c',
  },

  postBoxText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
  },
});

export default Home;
