import { useState } from "react";
import AppNavigation from "./Application/Navigation/AppNavigation";
import SideMenu from "./Application/SideMenu/SideMenu";
import AppHome from "./Application/AppHome/AppHome";
import ProjectOverviewPage from "./Application/Project/ProjectOverviewPage";
import Modal from "./utils/Modal";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Main(props) {
  const [closeSideMenu, setCloseSideMenu] = useState(true);
  const {compType} = props

  const userSession = useSelector(state => state.session.user)

  if (!userSession) return <Redirect to='/login'/>

  return (
    <>
    <Modal />
    <div className="h-screen overflow-hidden">
      <section>
        <AppNavigation
          setCloseSideMenu={setCloseSideMenu}
          closeSideMenu={closeSideMenu}
        />
      </section>
      <section className="flex h-full">
        {closeSideMenu && <SideMenu />}
        {compType === 'home' && <AppHome />}
        {compType === 'project page' && <ProjectOverviewPage />}
      </section>
    </div>
    </>
  );
}

export default Main;
