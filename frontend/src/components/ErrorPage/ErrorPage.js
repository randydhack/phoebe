import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function ErrorPage() {

    const userSession = useSelector(state => state.session.user)

    if (!userSession) return <Redirect to='/login'/>

    return (
        <div>ERROR 404</div>
    )
}

export default ErrorPage;
