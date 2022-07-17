import { createContext, useContext, useEffect, useState } from "react"
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { auth } from './firebase-config'

export const UserAuthContext = createContext()

export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState()
    const [twitterLoggedIn, setTwitterLoggedIn] = useState(false)
    const [oAuth_credential, setoAuth_credential] = useState()
    const [oAuth_token, setoAuth_token] = useState()
    const [oAuth_secret, setoAuth_secret] = useState()

    function logInWithPopupTwitter() {
        console.log('here');
        signInWithPopup(auth, TwitterAuthProvider)
            .then((result) => {
                console.log('woah im here?');

                setTwitterLoggedIn(true)

                let cred = TwitterAuthProvider.credentialFromResult(result)
                setoAuth_credential(cred)
                setoAuth_token(cred.accessToken)
                setoAuth_secret(cred.secret)

                return signInWithPopup(auth, TwitterAuthProvider)
            })
            .catch((error) => {
                console.log('error: ', error);
            })
    }
    function logInWithPopupGoogle() {
        return signInWithPopup(auth, GoogleAuthProvider)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <UserAuthContext.Provider value={{ user, logInWithPopupTwitter, logout, twitterLoggedIn, setTwitterLoggedIn, oAuth_credential, setoAuth_credential, oAuth_token, setoAuth_token, oAuth_secret, setoAuth_secret }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(UserAuthContext)
}