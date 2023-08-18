import AppNavigation from "./Application/Navigation/AppNavigation";
import SideMenu from "./Application/SideMenu/SideMenu";
import AppHome from "./Application/AppHome/AppHome";
function Main() {
  return (
    <div className="h-screen overflow-hidden">
      <section>
        <AppNavigation />
      </section>
      <section className="flex h-full">
        <SideMenu />
        <AppHome />
      </section>
    </div>
  );
}

export default Main;
