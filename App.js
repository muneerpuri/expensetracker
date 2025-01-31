import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from './src/screens/Auth';
import Dashboard from './src/screens/Dashboard';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={Auth}
          options={{title: 'Welcome',headerShown:false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: 'Dashboard',headerShown:false}}
        />
      </Stack.Navigator>
  );
};

export default App