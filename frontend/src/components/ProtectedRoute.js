import { Navigate } from "react-router-dom";
import { useUserAuth } from "../auth/UserAuthContext";

const ProtectedRouter = ({ children }) => {
    let { user } = useUserAuth()

    if (user) {
        console.log('protectedroute user: ', user);

        <Navigate to='/home' />
    }
    else {
        console.log('NOT LOGGED IN & TRYING TO ACCESS HOME');
    }

    return (
        children
    );
}

export default ProtectedRouter;