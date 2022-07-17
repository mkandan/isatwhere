import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import { auth } from '../auth/firebase-config'
import { signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { UserAuthContext } from '../auth/UserAuthContext';
import { axios } from 'axios'

const Login = () => {
    const providerTwitter = new TwitterAuthProvider()

    const [err, setErr] = useState("")
    const [showErr, setShowErr] = useState(true);
    const navigate = useNavigate()

    const { twitterLoggedIn, setTwitterLoggedIn, setoAuth_credential, setoAuth_token, setoAuth_secret } = useContext(UserAuthContext)

    const logInWithTwitter2 = () => {
        console.log('here login');
        signInWithPopup(auth, providerTwitter)
            .then((result) => {
                setTwitterLoggedIn(true)

                let cred = TwitterAuthProvider.credentialFromResult(result)
                setoAuth_credential(cred)
                setoAuth_token(cred.accessToken)
                setoAuth_secret(cred.secret)

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
            <button onClick={logInWithTwitter2}>
                {/* <button onClick={logInWithPopupTwitter}> */}
                Login with Twitter {twitterLoggedIn ? '✅' : '❌'}
            </button>
            <p>
                Don't have an account? Sign up <Link to={'/signup'}>here</Link>.
            </p>

        </>
    );
}

export default Login;