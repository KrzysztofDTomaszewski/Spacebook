/* 
  Krzysztof Dawid Tomaszewski - 18044535

  Logout class is a seperate class to make the application run faster, with less bloat, this means the Logout class
  can be called from the next set of screens via a button mapped to UserLogout.js

*/

// Core React 
import React from 'react';
import { Component } from 'react';

// Functionality Imports
import { View, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserLogout extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount() {
        this.killUserSession();
    }

    killUserSession = async () => {
        const xAuthToken = await AsyncStorage.getItem('@session_token');

        
        console.log("Session Ended "+xAuthToken);
        return fetch('http://10.0.2.2:3333/api/1.0.0/logout', {
            method: 'post',
            headers: {'X-Authorization': xAuthToken,}, 
        })
        .then(async(serverResponse) => {
            if(serverResponse.status === 200) { 
                await AsyncStorage.removeItem('@session_token');


                ToastAndroid.show("Session Terminated",ToastAndroid.SHORT);
                this.props.navigation.navigate("UserLogin");  
            }
            else if (serverResponse.status === 400){ throw "Bad Request"; }

            else if (serverResponse.status === 500){ throw "Server Error"; }


            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
    }
    
    render() {
        return (
            <View style = { styles.container }> 



            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default UserLogout;