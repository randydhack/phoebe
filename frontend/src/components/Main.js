import { useState } from "react";
import AppNavigation from "./Application/Navigation/AppNavigation";
import SideMenu from "./Application/SideMenu/SideMenu";
import AppHome from "./Application/AppHome/AppHome";
import Modal from "./utils/Modal";

function Main(props) {
  const [closeSideMenu, setCloseSideMenu] = useState(true);
  const {compType} = props

  return (
    <>
    <Modal />
    <div className="h-full overflow-hidden">
      <section>
        <AppNavigation
          setCloseSideMenu={setCloseSideMenu}
          closeSideMenu={closeSideMenu}
        />
      </section>
      <section className="flex h-screen overflow-hidden">
        {closeSideMenu && <SideMenu />}
        {compType === 'home' && <AppHome />}
      </section>
    </div>
    </>
  );
}

export default Main;
