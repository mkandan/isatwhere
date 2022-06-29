import { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { auth } from './firebase-config'

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState("")

    // function signUpWithEmailAndPassword(email, password) {
    //     return createUserWithEmailAndPassword(auth, email, password)
    // }
    // function logInWithEmailAndPassword(email, password) {
    //     return signInWithEmailAndPassword(auth, email, password)
    // }
    function logInWithPopupTwitter() {
        return signInWithPopup(auth, TwitterAuthProvider)
    }
    function logInWithPopupGoogle() {
        return signInWithPopup(auth, GoogleAuthProvider)
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
        <userAuthContext.Provider value={{ user, logInWithPopupTwitter }}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}