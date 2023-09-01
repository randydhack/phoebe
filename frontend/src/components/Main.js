import { useEffect, useState } from "react";
import AppNavigation from "./Application/Navigation/AppNavigation";
import SideMenu from "./Application/SideMenu/SideMenu";
import AppHome from "./Application/AppHome/AppHome";
import ProjectOverviewPage from "./Application/Project/ProjectOverviewPage";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Main(props) {
  const { compType } = props;

  const userSession = useSelector((state) => state.session.user);

  if (!userSession) return <Redirect to="/login" />;

  return (
    <>
      <div className="w-full">
        <div className="flex flex-auto">
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
