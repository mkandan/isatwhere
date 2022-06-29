import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Signup from './components/Signup';
import { UserAuthContextProvider } from './auth/UserAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>navbar ig</h1>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
