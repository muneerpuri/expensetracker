import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from './src/screens/Auth';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={Auth}
          options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
  );
};

export default App