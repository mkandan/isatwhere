import { auth } from '../auth/firebase-config'
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { useState } from 'react'

const AuthComponent = () => {
    const providerGoogle = new GoogleAuthProvider()
    const providerTwitter = new TwitterAuthProvider()

    const [twitterSignedIn, setTwitterSignedIn] = useState(false)
    const [googleSignedIn, setGoogleSignedIn] = useState(false)

    const signInWithTwitter = () => {
        signInWithPopup(auth, providerTwitter)
            .then((result) => {
                setTwitterSignedIn(true)

                console.log(result)
                console.log('providerId: ', result.providerId);
                console.log('display name: ', result._tokenResponse.displayName)

                const credential = TwitterAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log('credential: ', credential);
                console.log('token: ', token);
            })
            .catch((error) => {
                console.log('error: ', error);
            })
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                setGoogleSignedIn(true)

                console.log(result)
                console.log('providerId: ', result.providerId);
                console.log('display name: ', result._tokenResponse.displayName)

                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log('credential: ', credential);
                console.log('token: ', token);

            })
            .catch((error) => {
                console.log('error: ', error);
            })
    }

    return (
        <div>
            <button onClick={signInWithTwitter}>
                Sign in with Twitter {twitterSignedIn ? '✅' : '❌'}
            </button>
            <br />
            <button onClick={signInWithGoogle}>
                Sign in with Google {googleSignedIn ? '✅' : '❌'}
            </button>
        </div>
    )
}

export default AuthComponent;