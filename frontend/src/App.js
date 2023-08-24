import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Main from './components/Main';
import LoginPage from "./components/LoginFormPage/LoginPage";
import CreateProjectPage from "./components/Application/Project/CreateProjectPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SignupPage from "./components/SignupFormPage/SignupPage";


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
          <Route path="/signup" component={SignupPage}/>
          <Route path='/home' component={() => <Main compType='home'/>}/>
          <Route path='/projects' component={() => <Main compType='projects'/>}/>
          <Route path='/new-project' component={CreateProjectPage} />
          <Route path='/project/:id/overview' component={() => <Main compType='project page'/>} />
          <Route path='/project/:id/board' component={() => <Main compType='project board'/>}/>

          <Route path='' component={ErrorPage}/>
        </Switch>
      )}
    </>
  );
}

export default App;
