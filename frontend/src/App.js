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
        <Route path="/" element={<UserLogin/>}></Route>
        <Route path="/Register" element={<UserRegister/>}></Route>
        <Route path="/Landing" element={<Landing/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
