import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

function Landing() {

    const userSession = useSelector(state => state.session.user)

    if (userSession) return <Redirect to='/home'/>

    return (
        <div>
            Landing page
        </div>
    )
}

export default Landing
