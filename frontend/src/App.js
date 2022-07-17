// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute'
import { UserAuthContextProvider } from './auth/UserAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>navbar</h1>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
