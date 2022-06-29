import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './components/Login';
import AuthComponent from './components/AuthComponent';
import { UserAuthContextProvider } from './auth/UserAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { auth } from './auth/firebase-config'
// import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";


function App() {


  return (
    <div className="App">
      <h1>navbar ig</h1>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<AuthComponent />}></Route>
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
