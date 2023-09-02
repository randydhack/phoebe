import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Main from "./components/Main";
import LoginPage from "./components/LoginFormPage/LoginPage";
import CreateProjectPage from "./components/Application/Project/CreateProjectPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SignupPage from "./components/SignupFormPage/SignupPage";
import AppNavigation from "./components/Application/Navigation/AppNavigation";
import SideMenu from "./components/Application/SideMenu/SideMenu";
import Modal from './components/utils/Modal'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [closeSideMenu, setCloseSideMenu] = useState(true);

  const userSession = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const data = window.localStorage.getItem("SET_SIDE_MENU");
    setCloseSideMenu(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("SET_SIDE_MENU", JSON.stringify(closeSideMenu));
  }, [closeSideMenu]);

  return (
    <>
      {isLoaded && (
        <>
        <Modal />
          <div>
            {userSession && (
              <section>
                <AppNavigation
                  setCloseSideMenu={setCloseSideMenu}
                  closeSideMenu={closeSideMenu}
                />
              </section>
            )}
            <div className="flex flex-auto">
              {userSession && (
                <section>{closeSideMenu && <SideMenu />}</section>
              )}
              <Switch>
                <Route
                  path="/home"
                  component={() => <Main compType="home" />}
                />
                <Route
                  path="/projects"
                  component={() => <Main compType="projects" />}
                />
                <Route
                  exact
                  path="/project/:id/overview"
                  component={() => <Main compType="project page" />}
                />
                <Route
                  exact
                  path="/project/:id/board"
                  component={() => <Main compType="project board" />}
                />
                <Route exact path="/" />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/new-project" component={CreateProjectPage} />
                <Route component={ErrorPage} />
              </Switch>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
