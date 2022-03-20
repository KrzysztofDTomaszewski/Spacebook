import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert } from 'react-native';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailInput = (email) => {
    this.setState({email: email})
  }


  handlePasswordInput = (pass) => {
    this.setState({password: pass})
  }

  render() {
    return (
    <View>
      <TextInput placeholder='email...' onChangeText={this.handleEmailInput} value={this.state.email} />
      <TextInput placeholder='password...' onChangeText={this.handlePasswordInput} value={this.state.password} />
    </View>
    );
  }

}

// const styles = StyleSheet.create({
// });

export default Login