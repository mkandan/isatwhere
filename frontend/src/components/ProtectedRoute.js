import { Navigate } from "react-router-dom";
import { useUserAuth } from "../auth/UserAuthContext";

const ProtectedRouter = ({ children }) => {
    let { user } = useUserAuth()

    if (!user) {
        <Navigate to='/home' />
    }

    return (
        children
    );
}

export default ProtectedRouter;