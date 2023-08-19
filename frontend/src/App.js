import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Main from './components/Main'
import LoginPage from "./components/LoginFormPage/LoginPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/"/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup"/>
          <Route path='/home' component={e => <Main compType='home'/>}/>
          <Route path='/projects' component={e => <Main compType='projects'/>}/>
          <Route path='/new-project' component={e => <Main compType='new-project'/>} />
        </Switch>
      )}
    </>
  );
}

export default App;
