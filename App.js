import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from './src/screens/Auth';
import Dashboard from './src/screens/Dashboard';
import Categories from './src/screens/Categories';

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
          name="Categories"
          component={Categories}
          options={{title: 'Categories',headerShown:false}}
        />
        <Stack.Screen
          name="Expenses"
          component={Dashboard}
          options={{title: 'Expenses',headerShown:false}}
        />
      </Stack.Navigator>
  );
};

export default App