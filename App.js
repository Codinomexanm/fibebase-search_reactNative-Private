import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Task from './src/pages/main'
import NewTaks from './src/pages/maps'

const Stack = createNativeStackNavigator();
  console.disableYellowBox = true;
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='CTO'
          component={Task}
          options={{
            headerTintColor:"#FFD700",
            title: 'Tarefas',
          }}
        />
        <Stack.Screen
          name='Maps'
          component={NewTaks}
          options={{
            title: 'Mapa',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;