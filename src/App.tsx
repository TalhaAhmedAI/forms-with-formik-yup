import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

import { Signup } from './Signup/Signup'
import {Multistep} from './Multistep/Multistep';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"> <Signup /> </Route>
          <Route path="/multistep"> <Multistep /> </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
