import { createContext, useContext, useEffect, useState } from "react"
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { auth } from './firebase-config'

export const UserAuthContext = createContext()

export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState("")
    const [twitterDisplayName, setTwitterDisplayName] = useState("")

    function logInWithPopupTwitter() {
        return signInWithPopup(auth, TwitterAuthProvider)
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
        <UserAuthContext.Provider value={{ user, logInWithPopupTwitter, logout, twitterDisplayName, setTwitterDisplayName }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(UserAuthContext)
}