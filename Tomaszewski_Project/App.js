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
import UserRegistery from 'components/screens';

// Stack Navigator Initialised
const Stack = createStackNavigator();



// Main Screen Loader Class
class App extends React.Component {
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            
            <Stack.Screen name="UserRegistery" component={UserRegistery} options={{title: 'Register'}}/>
          
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

export default App;