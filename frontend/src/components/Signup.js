import { auth } from '../auth/firebase-config'
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'

const AuthComponent = () => {
    const providerGoogle = new GoogleAuthProvider()
    const providerTwitter = new TwitterAuthProvider()

    const [twitterSignedUp, setTwitterSignedUp] = useState(false)
    const [googleSignedUp, setGoogleSignedUp] = useState(false)

    const [err, setErr] = useState("")
    const [showErr, setShowErr] = useState(true);


    const signUpWithTwitter = () => {
        signInWithPopup(auth, providerTwitter)
            .then((result) => {
                setTwitterSignedUp(true)

                console.log(result)
                console.log('providerId: ', result.providerId);
                console.log('display name: ', result._tokenResponse.displayName)

                const credential = TwitterAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log('credential: ', credential);
                console.log('token: ', token);
            })
            .catch((error) => {
                setErr(error.message)
                console.log('error: ', error);
            })
    }

    const signUpWithGoogle = () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                setGoogleSignedUp(true)

                console.log(result)
                console.log('providerId: ', result.providerId);
                console.log('display name: ', result._tokenResponse.displayName)

                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log('credential: ', credential);
                console.log('token: ', token);

            })
            .catch((error) => {
                setErr(error.message)
                console.log('error: ', error);
            })
    }

    return (
        <div>
            {
                err && showErr && <Alert variant='danger' dismissible onClose={() => setShowErr(false)}>{err}</Alert>
            }
            <button onClick={signUpWithTwitter}>
                Sign in with Twitter {twitterSignedUp ? '✅' : '❌'}
            </button>
            <br />
            {
                twitterSignedUp && <button onClick={signUpWithGoogle}>
                    Sign in with Google {googleSignedUp ? '✅' : '❌'}
                </button>
            }
        </div>
    )
}

export default AuthComponent;