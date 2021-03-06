import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppStoreContext, appStore, history} from "./store";
import {StoreContext} from "./models";
import {Router, Route, Switch} from 'react-router'
import {ExamplePage} from "./ExamplePage";
import {ExamplePage2} from "./ExamplePage2";

const App = () => {
  return (
    <AppStoreContext.Provider value={appStore}>
      <StoreContext.Provider value={appStore.gqlStore}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={ExamplePage} />
            <Route exact path="/2" component={ExamplePage2} />
          </Switch>
        </Router>
      </StoreContext.Provider>
    </AppStoreContext.Provider>

  );
}

export default App;
