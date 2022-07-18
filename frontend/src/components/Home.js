import { auth } from '../auth/firebase-config'
import { useUserAuth, UserAuthContext } from "../auth/UserAuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CalEvents from "./CalEvents";
import axios from 'axios'
import { useContext, useEffect, useState } from "react";

const Home = () => {
    // const { user, logout } = useUserAuth()
    const { user, logout, oAuth_token, oAuth_secret } = useContext(UserAuthContext)
    const [twitterName, settwitterName] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        // getTwitterName()
        console.log(user);
        console.log('auth.currentUser HOME: ', auth.currentUser);
    }, [user])


    function getTwitterUsername() {
        return user.reloadUserInfo.screenName
    }

    const getTwitterPhotoUrl = () => {
        return user.providerData[0].photoURL
    }

    const getTwitterName = async () => {
        try {
            // console.log('user.providerData[0].displayName: ', user.providerData[0].displayName);

            if (user.providerData[0].displayName === undefined) {
                console.log('undefined provider data');
                // return twitterName
            }
            else {
                console.log('BEFORE twitterName: ', twitterName);
                settwitterName(user.providerData[0].displayName)
                console.log('AFTER twitterName: ', twitterName);
            }
            // return user.providerData[0].displayName
            console.log('2AFTER twitterName: ', twitterName);
            // return twitterName
        } catch (error) {
            console.log('error: ', error.message);
        }
    }

    const getTwitterName2 = () => {
        // return user.providerData[0].displayName
        return auth.currentUser.providerData[0].displayName
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
        console.log('get button pressed'); //works
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

    const getVerifyCreds = async () => {
        try {
            axios
                .get('/api/twitter/verify_credentials')
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
            <p>Currently Displaying: {getTwitterName2()}</p>
            {/* <p>Currently Displaying: {twitterName}</p> */}
            <Button variant='primary' onClick={handleLogout}>Logout</Button>
            <p>token: {oAuth_token}</p>
            <p>secret: {oAuth_secret}</p>
            <button onClick={getVerifyCreds}>getVerifyCreds</button>
            <button onClick={getCredData}>getCredData</button>
            <CalEvents />
        </>
    );
}

export default Home;