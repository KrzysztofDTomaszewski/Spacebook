/* 
  Krzysztof Dawid Tomaszewski - 18044535

  App.js will load screens from a Stack, first user will be prompted to Register, if their account exists, then
  prompt will be given to sign in with an existing account stored in the tomaszek database (localhost:3333/api/1.0.0)

*/

// Core Components
import * as React from 'react';

// Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screen Imports
import UserRegistery from './components/screens/UserRegistery';
import Home from './components/screens/Home';

// Because RN is a pile of s
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

// Stack Navigator Initialised
const Stack = createStackNavigator();



// Main Screen Loader Class
class App extends React.Component {
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name="UserRegistery" component={UserRegistery} options={{title: 'Registry Form'}}/>
            <Stack.Screen name="Home" component={Home} options={{title: 'Home Page'}}/>
          
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

export default App;