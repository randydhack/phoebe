import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";


function ErrorPage() {
    const userSession = useSelector(state => state.session.user)

    if (!userSession) return <Redirect to='/login'/>
    else return <Redirect to='/home'/>
}

export default ErrorPage;
