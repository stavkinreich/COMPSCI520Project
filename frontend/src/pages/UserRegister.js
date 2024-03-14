import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PasswordEmailValidation from '../PasswordEmailValidation';

function UserRegister() {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [exceptions, setExceptions] = useState({});
    const handleInfo = (event) => {
        setUserInfo(before => ({...before, [event.target.name]: event.target.value}))
        console.log(userInfo);
    }
    const handleSubmit= (event) => {
        event.preventDefault();
        console.log("got it");
        setExceptions(PasswordEmailValidation(userInfo));
    }
    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
            <h1 className="text-center">Register</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3 text-center">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="name" name="name" placeholder="Enter Your Name" className="form-control rounded-0" onChange={handleInfo}/>
                        {exceptions.name && <span className="text-danger">Not Valid Name</span>}
                    </div>
                    <div className="mb-3 text-center">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" name="email" placeholder="Enter Your Email" className="form-control rounded-0" onChange={handleInfo}/>
                        {exceptions.email && <span className="text-danger">Not Valid Email</span>}
                    </div>
                    <div className="mb-3 text-center">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" name="password" placeholder="Enter Your Password" className="form-control rounded-0" onChange={handleInfo}/>
                        {exceptions.password && <span className="text-danger">Not Valid Password</span>}
                    </div>
                    <button className="btn btn-success w-100">Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default UserRegister;