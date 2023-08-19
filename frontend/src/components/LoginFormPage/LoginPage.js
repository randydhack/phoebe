
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import { useHistory } from "react-router-dom"

function LoginPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(login({
            credential: 'demo@aa.io',
            password: 'password'
        }))

        return history.push('/home')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">dsada</button>
            </form>
        </div>
    )
}

export default LoginPage
