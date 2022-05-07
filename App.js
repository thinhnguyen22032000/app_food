// In App.js in a new project

import * as React from 'react';

import { UserProvider } from './src/contexts/userContext';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tabs'
import {requestLocationPermission} from './src/permissions/index'

function App() {
  
  React.useEffect(() => {
     requestLocationPermission()
  }, [])

  return (
    <NavigationContainer>
      <UserProvider>
          <Tabs/>
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;