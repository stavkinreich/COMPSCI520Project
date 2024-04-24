import logo from './logo.svg';
import './App.css';
import UserLogin from "./pages/UserLogin"
import UserRegister from "./pages/UserRegister"
import Landing from './pages/Landing';
import RegisterSuccessful from './pages/RegisterSuccessful';
import VerifiedEmail from './pages/VerifiedEmail'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/Register" element={<UserRegister/>}></Route>
        <Route path="/Login" element={<UserLogin/>}></Route>
        <Route path="/RegisteredSuccessfully" element={<RegisterSuccessful/>}></Route>
        <Route path="/verify-email/:token" element={<VerifiedEmail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
