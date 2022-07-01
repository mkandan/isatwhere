import { Button } from "react-bootstrap";
import { useUserAuth, UserAuthContext } from "../auth/UserAuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import CalEvents from "./CalEvents";
import Login from "./Login";
import { useContext } from "react"; //save for backup displayName method
import TwitterTests from "./twittertests";

const Home = () => {
    const { user, logout, twitterDisplayName } = useUserAuth()
    // const { twitterDisplayName } = useContext(UserAuthContext)
    const navigate = useNavigate()
    console.log(user)
    // console.log("user uid: ", user.uid);

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <h1>welcome home, {user && `@${user.reloadUserInfo.screenName}`}
                {user && <img src={user.photoURL} alt="pfp" />}
            </h1>
            <p>Currently Displaying: {user.displayName}</p>
            <p>Currently Displaying2: {twitterDisplayName}</p>
            <Button variant='primary' onClick={handleLogout}>Logout</Button>
            <br />
            <h2>twitter api test</h2>
            <TwitterTests />
            <CalEvents />
        </>
    );
}

export default Home;