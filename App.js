// In App.js in a new project

import * as React from 'react';

import { UserProvider } from './src/contexts/userContext';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tabs'
import { RestaurantContext } from './src/contexts/restaurantContext';


function App() {
  return (
    <NavigationContainer>
      <UserProvider>
       
          <Tabs/>
        
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;