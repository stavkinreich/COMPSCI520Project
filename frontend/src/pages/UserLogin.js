import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.js'
function UserLogin() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    });
    const [exceptions, setExceptions] = useState({});
    const handleInfo = (event) => {
        setUserInfo(before => ({...before, [event.target.name]: event.target.value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var request = new Request('http://localhost:3001/api/loginUser', {
                        method: 'POST',
                        headers: new Headers({'Content-Type': 'application/json'}),
                        body: JSON.stringify(userInfo)
                    })
                    fetch(request)
                        .then(function(response) {
                            response.json()
                                .then(function(data) {
                                    if(data.message === 0) {
                                        setExceptions({internal: "internalError"});
                                    }
                                    if(data.message === 1) {
                                        setExceptions({data: "dataError"});
                                    }
                                    if(data.message === 2) {
                                        setExceptions({validate: "validateError"});
                                    }
                                    if(data.message === 3) {
                                        console.log(data.retObj);
                                        globalThis.userName = userInfo.email;
                                        globalThis.prefLang = data.retObj.preflang;
                                        globalThis.prefMov = data.retObj.prefmov;
                                        globalThis.prefGen = data.retObj.prefgen;
                                        globalThis.prefMovId = data.retObj.prefmovid;
                                        navigate('/');
                                    }
                                });
                        });
    }
  return (
  <div>
    <Navbar/>
    <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: "#3E2751"}}>
        <div className="bg-white p-3 rounded w-25">
        <h1 className="text-center">Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3 text-center" onSubmit={handleSubmit}>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" name="email" placeholder="Enter Your Email" className="form-control rounded-0" onChange={handleInfo}/>
                </div>
                <div className="mb-3 text-center">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" name="password" placeholder="Enter Your Password" className="form-control rounded-0" onChange={handleInfo}/>
                </div>
                {exceptions.data && <span className="text-danger">Email and/or password are not correct</span>}
                {exceptions.internal && <span className="text-danger">Internal Error</span>}
                {exceptions.validate && <span className="text-danger">User is not validated</span>}
                <button className="btn btn-success w-100">Log In</button>
                <p></p>
                <Link to="/Register" className="btn btn-default border w-100 bg-light text-decoration-none">Not A User? Register Here</Link>
            </form>
        </div>
    </div>
  </div>
  )
}

export default UserLogin;
