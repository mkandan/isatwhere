import { createContext, useContext } from "react"
import { createUserWithEmailAndPassword, signInWithPopup, signInWithCredential, onAuthStateChanged } from "firebase/auth"
import { auth } from './firebase-config'

const userAuthContext = createContext()

export function userAuthContextProvider({ componentchildren }) {
    function signUpWithGoogle() {
        return signInWithPopup()
    }

    return (
        <userAuthContext.Provider value={ }>
            {componentchildren}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}