import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Signup } from './Signup/Signup'
import {Multistep} from './Multistep/Multistep';

function App() {
  return (
    <div className="App">
      {/* <Signup /> */}
      <Multistep />
    </div>
  );
}

export default App;
