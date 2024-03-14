import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function UserLogin() {

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
    }
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
        <h1 className="text-center">Login</h1>
            <form action="">
                <div className="mb-3 text-center" onSubmit={handleSubmit}>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" name="email" placeholder="Enter Your Email" className="form-control rounded-0" onChange={handleInfo}/>
                </div>
                <div className="mb-3 text-center">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" name="password" placeholder="Enter Your Password" className="form-control rounded-0" onChange={handleInfo}/>
                </div>
                <button className="btn btn-success w-100">Log In</button>
                <p></p>
                <Link to="/Register" className="btn btn-default border w-100 bg-light text-decoration-none">Not A User? Register Here</Link>
            </form>
        </div>
    </div>
  )
}

export default UserLogin;
