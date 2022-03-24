// React Detrimental Class Component Imports
import React, { Component } from 'react';
import { Text, View } from 'react-native';

//Import Screens
import Login from './components/Login';

class App extends Component {

  render() {
    return (
    <View>
      <Login />
    </View>
    );
  }

}

export default App