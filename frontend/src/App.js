import logo from './logo.svg';
import './App.css';
import UserLogin from "./pages/UserLogin"
import UserRegister from "./pages/UserRegister"
import Landing from './pages/Landing';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/Register" element={<UserRegister/>}></Route>
        <Route path="/Login" element={<UserLogin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
