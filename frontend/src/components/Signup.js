import { auth } from '../auth/firebase-config'
import { getAuth, signInWithPopup, linkWithPopup, signInWithRedirect, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom';

const AuthComponent = () => {
    const providerGoogle = new GoogleAuthProvider()
    const providerTwitter = new TwitterAuthProvider()

    const [twitterSignedUp, setTwitterSignedUp] = useState(false)
    const [googleSignedUp, setGoogleSignedUp] = useState(false)

    const [err, setErr] = useState("")
    const [showErr, setShowErr] = useState(true);
    const navigate = useNavigate()

    const signUpWithTwitter = () => {
        signInWithPopup(auth, providerTwitter)
            .then((result) => {
                setTwitterSignedUp(true)

                console.log(result)
                console.log('providerId: ', result.providerId);
                console.log('display name: ', result._tokenResponse.displayName)

                const popupTwitter_credential = TwitterAuthProvider.credentialFromResult(result);
                const popupTwitter_token = popupTwitter_credential.accessToken;

                console.log('popupTwitter_credential: ', popupTwitter_credential);
                console.log('popupTwitter_token: ', popupTwitter_token);

                linkWithPopup(auth.currentUser, providerGoogle).then((result) => {
                    const linkGoogle_credential = GoogleAuthProvider.credentialFromResult(result);
                    const linkGoogle_user = result.user;
                    const linkGoogle_token = linkGoogle_credential.accessToken;

                    setGoogleSignedUp(true)
                    navigate('/home')

                    console.log('linkGoogle_credential: ', linkGoogle_credential);
                    console.log('linkGoogle_token: ', linkGoogle_token);
                    console.log('linkGoogle_user: ', linkGoogle_user);
                }).catch((error) => {
                    setErr(error.message)
                    console.log('error: ', error);
                })
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
                First, sign in with Twitter {twitterSignedUp ? '✅' : '❌'}
            </button>
            <br />
            {
                twitterSignedUp && <button>
                    Then, sign in with Google {googleSignedUp ? '✅' : '❌'}
                </button>
            }
        </div>
    )
}

export default AuthComponent;