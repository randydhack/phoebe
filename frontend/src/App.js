import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, NavLink, history, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
import Main from "./components/Main";
import { LuBird } from "react-icons/lu";
import LoginPage from "./components/LoginFormPage/LoginPage";
import CreateProjectPage from "./components/Application/Project/CreateProjectPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SignupPage from "./components/SignupFormPage/SignupPage";
import AppNavigation from "./components/Application/Navigation/AppNavigation";
import SideMenu from "./components/Application/SideMenu/SideMenu";
import Modal from "./components/utils/Modal";
import Landing from "./components/Landing/Landing";
import { motion } from "framer-motion";
import { InfoContext } from "./context/InfoContext";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [closeSideMenu, setCloseSideMenu] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { landingNav, setLandingNav } = useContext(InfoContext)

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


useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
        passive: true
    });
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
}, [scrollPosition]);

useEffect(() => {
   localStorage['scroll'] = scrollPosition.toString();
}, [scrollPosition]);

const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
};

console.log(scrollPosition)

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
    console.log(window.location.href)
  return (
    <>
      {isLoaded && (
        <>
          <Modal />
          <div className={`${!userSession ? 'overflow-auto overflow-x-hidden' : 'absolute z-[-1] w-full h-full '}`}>
            <div className={`${userSession ? 'overflow-hidden bottom-0 top-0 right-0 left-0 flex flex-col absolute ': ''}`}>
            {landingNav && <div className="flex items-center justify-between absolute w-full bg-[#EDEBEA] z-10 h-[60px] pt-5 pb-6 top-0 px-[100px] mb-[]">
        <NavLink
          to="/"
          className="font-medium text-[24px] flex items-center justify-center"
          onClick={e => setLandingNav(true)}
        >
          <LuBird className="mr-[10px]" />
          Phoebe
        </NavLink>
        <div className="flex text-[16px] items-center">
          <NavLink
            to="/login"
            className="mr-[20px] text-[#727272] font-normal hover:text-black duration-200 ease-in"
            onClick={e => setLandingNav(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            onClick={e => setLandingNav(false)}
            className="bg-black text-white h-[36px] w-[116px] rounded-[5px] flex items-center justify-center"
          >
            Get Started
          </NavLink>
        </div>
      </div>}
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
