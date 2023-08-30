import { useEffect, useState } from "react";
import AppNavigation from "./Application/Navigation/AppNavigation";
import SideMenu from "./Application/SideMenu/SideMenu";
import AppHome from "./Application/AppHome/AppHome";
import ProjectOverviewPage from "./Application/Project/ProjectOverviewPage";
import Modal from "./utils/Modal";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';


function Main(props) {
  const [closeSideMenu, setCloseSideMenu] = useState(true);
  const { compType } = props;

  const userSession = useSelector((state) => state.session.user);


  useEffect(() => {
    const data = window.localStorage.getItem('SET_SIDE_MENU')
    setCloseSideMenu(JSON.parse(data))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('SET_SIDE_MENU', JSON.stringify(closeSideMenu))
  }, [closeSideMenu])

  if (!userSession) return <Redirect to="/login" />;

  return (
    <>
      <div className="absolute w-full">
        <Modal />
        <div>
          <section>
            <AppNavigation
              setCloseSideMenu={setCloseSideMenu}
              closeSideMenu={closeSideMenu}
            />
          </section>
        </div>
        <div className="flex flex-auto">
          <section>{closeSideMenu && <SideMenu />}</section>
          <section className="w-full flex flex-col flex-1 h-screen">
            {compType === "home" && <AppHome />}
            {compType === "project page" && (
              <ProjectOverviewPage compType="overview" />
            )}
              {compType === "project board" && (
                <ProjectOverviewPage compType="board" />
              )}
          </section>
        </div>
      </div>
    </>
  );
}

export default Main;
