import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";


function ErrorPage() {
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    if (!user) return <Redirect to='/home'/>


    return history.goBack()
}

export default ErrorPage;
