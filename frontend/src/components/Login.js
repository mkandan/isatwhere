import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../auth/firebase-config'
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { useContext, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useUserAuth, UserAuthContext } from '../auth/UserAuthContext';

const Login = () => {
    const providerTwitter = new TwitterAuthProvider()

    const [twitterLoggedIn, setTwitterLoggedIn] = useState(false)

    const [err, setErr] = useState("")
    const [showErr, setShowErr] = useState(true);
    const navigate = useNavigate()

    const { twitterDisplayName, setTwitterDisplayName } = useUserAuth()
    // const { twitterDisplayName, setTwitterDisplayName } = useContext(UserAuthContext)

    const logInWithTwitter = () => {
        signInWithPopup(auth, providerTwitter)
            .then((result) => {
                setTwitterLoggedIn(true)

                console.log(result)
                console.log('providerId: ', result.providerId);
                console.log('display name: ', result._tokenResponse.displayName)


                setTwitterDisplayName(result._tokenResponse.displayName)
                console.log('twitterDisplayName: ', twitterDisplayName);


                const credential = TwitterAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log('credential: ', credential);
                console.log('token: ', token);
                navigate('/home')
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
                Login with Twitter {twitterLoggedIn ? '✅' : '❌'}
            </button>
            <p>
                Don't have an account? Sign up <Link to={'/signup'}>here</Link>.
            </p>

        </>
    );
}

export default Login;