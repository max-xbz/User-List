import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import CreateNew from './CreateNew';
import EditUser from './EditUser';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/create" component={CreateNew}/>
          <Route path="/edit/:id" component={EditUser}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
