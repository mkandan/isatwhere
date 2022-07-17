import { Button } from "react-bootstrap";
import { useUserAuth, UserAuthContext } from "../auth/UserAuthContext";
import { useNavigate } from "react-router-dom";
import CalEvents from "./CalEvents";
import axios from 'axios'
import { useContext } from "react";

const Home = () => {
    // const { user, logout } = useUserAuth()
    const { user, logout, oAuth_token, oAuth_secret } = useContext(UserAuthContext)

    const navigate = useNavigate()

    function getTwitterUsername() {
        return user.reloadUserInfo.screenName
    }

    const getTwitterPhotoUrl = () => {
        return user.providerData[0].photoURL
    }

    const getTwitterDisplayName = () => {
        return user.providerData[0].displayName
    }

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const getCredData = async () => {
        console.log('post button pressed'); //works
        try {
            console.log('oAuth_token: ', oAuth_token); //works
            console.log('oAuth_secret: ', oAuth_secret); //works
            axios
                .get('/api/twitter/auth', {
                    params: {
                        oAuth_token,
                        oAuth_secret
                    }
                })
                .then(response => {
                    console.log('response: ', response);
                })
                .catch(error => {
                    console.log(error.message);
                })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <h1>welcome, {user && `@${getTwitterUsername()}`}
                {user && <img src={getTwitterPhotoUrl()} alt="pfp" />}
            </h1>
            <p>Currently Displaying: {getTwitterDisplayName()}</p>
            <Button variant='primary' onClick={handleLogout}>Logout</Button>
            <p>token: {oAuth_token}</p>
            <p>secret: {oAuth_secret}</p>
            <button onClick={getCredData}>getCredData</button>
            <CalEvents />
        </>
    );
}

export default Home;