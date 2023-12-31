import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Main from "./components/Main";
import LoginPage from "./components/LoginFormPage/LoginPage";
import CreateProjectPage from "./components/Application/Project/CreateProjectPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SignupPage from "./components/SignupFormPage/SignupPage";
import AppNavigation from "./components/Application/Navigation/AppNavigation";
import SideMenu from "./components/Application/SideMenu/SideMenu";
import Modal from "./components/utils/Modal";
import Landing from "./components/Landing/Landing";
import { motion } from "framer-motion";

import './index.css'
import MemberInviteNotification from "./components/ModalPages/MemberInviteNotification";
import { InfoContext } from "./context/InfoContext";

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


  const sideMenuAnimation = !closeSideMenu
    ? {
        width: '0px',
      }
    : '';

    const sideMenuTransition = {
      type: 'stiff',
      stiffness: 100,
      ease: 'linear',
      width: {
        duration: 0.1
      }
    }

  return (
    <>
      {isLoaded && (
        <>

          <Modal />
          <div className={`${!userSession ? 'overflow-auto overflow-x-hidden scroll-z' : 'absolute z-[-1] w-full h-full '}`}>
            <div className={`${userSession ? 'overflow-hidden bottom-0 top-0 right-0 left-0 flex flex-col absolute ': ''}`}>
              {userSession && (
                <section>
                  <AppNavigation
                    setCloseSideMenu={setCloseSideMenu}
                    closeSideMenu={closeSideMenu}
                  />
                </section>
              )}
              <div className="flex">
                {userSession && (
                  <motion.section className="flex-[0_0_auto] relative justify-end flex" animate={sideMenuAnimation} transition={sideMenuTransition}>
                    <SideMenu closeSideMenu={closeSideMenu}/>
                  </motion.section>
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
                  <Route exact path="/" component={Landing} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/signup" component={SignupPage} />
                  <Route path="/new/blank/project" component={CreateProjectPage} />
                  <Route component={ErrorPage} />
                </Switch>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
