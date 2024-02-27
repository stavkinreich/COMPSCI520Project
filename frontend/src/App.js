import logo from './logo.svg';
import './App.css';
import UserLogin from "./UserLogin"
import UserRegister from "./UserRegister"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<UserLogin/>}></Route>
        <Route path="/Register" element={<UserRegister/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
