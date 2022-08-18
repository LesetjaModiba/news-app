import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home';
import Read from './components/read';


const Stack = createNativeStackNavigator();

//key: 637c0d3be8f44b85958bd4f9b26c509a
const App = () => {

  return (
    <NavigationContainer >
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="read" component={Read} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;