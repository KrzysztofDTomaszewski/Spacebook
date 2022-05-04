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
import UserLogin from './components/screens/UserLogin';
import UserLogout from './components/screens/UserLogout';
import PatchUserDetails from './components/screens/PatchUserDetails';
import Account from './components/screens/Account';
import Home from './components/screens/Home';
import ResetApplication from './components/screens/ResetApplication';
import UserPosts from './components/screens/UserPosts';
import GetUserPosts from './components/screens/GetUserPosts';

// Because RN is a pile of s
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

// Stack Navigator Initialised
const Stack = createStackNavigator();



// Entry Point == First Screen
class App extends React.Component {
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name="UserRegistery" component={UserRegistery} options={{title: 'Spacebook Register'}}/>
            <Stack.Screen name="UserLogin" component={UserLogin} options={{title: 'Spacebook Login'}}/>
            <Stack.Screen name="UserLogout" component={UserLogout} options={{title: 'Logout'}}/>
            <Stack.Screen name="Home" component={Home} options={{title: 'Welcome to Spacebook!'}}/>
            <Stack.Screen name="PatchUserDetails" component={PatchUserDetails} options={{title: 'Patch Details'}}/>
            <Stack.Screen name="Account" component={Account} options={{title: 'Account Details'}}/>
            <Stack.Screen name="ResetApplication" component={ResetApplication} options={{title: 'Reset Application'}}/>
            <Stack.Screen name="UserPosts" component={UserPosts} options={{title: 'Send Post'}}/>
            <Stack.Screen name="GetUserPosts" component={GetUserPosts} options={{title: 'Your Posts'}}/>
          
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

export default App;