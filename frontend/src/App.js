import logo from './logo.svg';
import './App.css';
import AuthComponent from './components/AuthComponent';
// import { auth } from './auth/firebase-config'
// import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";


function App() {


  return (
    <div className="App">
      <AuthComponent />
    </div>
  );
}

export default App;
