import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

const App = () => {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
};

export default App;
