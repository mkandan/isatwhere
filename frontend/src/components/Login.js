import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import { auth } from '../auth/firebase-config'
import { signInWithPopup, TwitterAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";
import { UserAuthContext } from '../auth/UserAuthContext';
import { axios } from 'axios'

const Login = () => {
    const providerTwitter = new TwitterAuthProvider()

    const [err, setErr] = useState("")
    const [showErr, setShowErr] = useState(true);
    const navigate = useNavigate()

    const { user, twitterLoggedIn, setTwitterLoggedIn, setoAuth_credential, setoAuth_token, setoAuth_secret } = useContext(UserAuthContext)

    const [loggedIn, setLoggedIn] = useState(false)
    // const [token, setToken] = useState('')

    useEffect(() => {
        auth.onAuthStateChanged((userCreds) => {
            console.log('auth: ', auth);
            console.log('user: ', user);
            console.log('userCreds: ', userCreds);
            userCreds.getIdToken()
                .then((token) => {
                    // console.log('token: ', token);
                    // setToken(token)
                    setLoggedIn(true)
                    navigate('/home')
                })
        })
    }, [])

    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            console.log('persistence set!');
            return logInWithTwitter
        })
        .catch((error) => {
            console.log(error.message);
        })

    const logInWithTwitter = () => {
        console.log('twitter login button pressed');
        signInWithPopup(auth, providerTwitter)
            .then((result) => {
                if (result) {
                    // setTwitterLoggedIn(true)
                    setLoggedIn(true)

                    let cred = TwitterAuthProvider.credentialFromResult(result)
                    setoAuth_credential(cred)
                    setoAuth_token(cred.accessToken)
                    setoAuth_secret(cred.secret)
                    // console.log('user LOGIN: ',user);
                    console.log('auth.currentUser LOGIN: ', auth.currentUser);

                    navigate('/home')
                }
            })
            .catch((error) => {
                setErr(error.message)
                console.log('error: ', error);
            })
    }

    return (
        <>
            {
                err && showErr && <Alert variant='danger' dismissible onClose={() => setShowErr(false)}>{err}</Alert>
            }
            <button onClick={logInWithTwitter}>
                {/* <button onClick={logInWithPopupTwitter}> */}
                {/* Login with Twitter {twitterLoggedIn ? '✅' : '❌'} */}
                Login with Twitter {loggedIn ? '✅' : '❌'}
            </button>
            <p>
                Don't have an account? Sign up <Link to={'/signup'}>here</Link>.
            </p>

        </>
    );
}

export default Login;