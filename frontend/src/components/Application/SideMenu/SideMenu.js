import { NavLink } from "react-router-dom"

function SideMenu() {

    return (
        <div className="w-[250px] bg-[#2E2E30] border-solid border-l-[1px] border-r-[1px] border-[#424244]">
            <NavLink to='/home' className="text-white">Home</NavLink>
        </div>
    )
}


export default SideMenu
