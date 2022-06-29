import { Button } from "react-bootstrap";
import { UserAuthContextProvider, useUserAuth } from "../auth/UserAuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
    const { user, logout } = useUserAuth()
    const navigate = useNavigate()
    console.log(user)

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <h1>welcome home, {user && `@${user.reloadUserInfo.screenName}`}
                {user && <img src={user.photoURL} alt="pfp" />}
            </h1>
            <p>Currently Displaying: {user.displayName}</p>
            <Button variant='primary' onClick={handleLogout}>Logout</Button>
        </>
    );
}

export default Home;