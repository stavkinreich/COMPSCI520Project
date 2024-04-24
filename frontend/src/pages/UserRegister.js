import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PasswordEmailValidation from '../PasswordEmailValidation';
import emailjs from '@emailjs/browser';

function UserRegister() {
    emailjs.init({
      publicKey: 'TpP3AfQqh7okbmM0a'
     });
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [exceptions, setExceptions] = useState({});
    const handleInfo = (event) => {
        setUserInfo(before => ({...before, [event.target.name]: event.target.value}))
    }
    const handleSubmit= (event) => {
        event.preventDefault();
        const userError = PasswordEmailValidation(userInfo);
        setExceptions(userError);
        if(Object.keys(userError).length === 0) {
            var request = new Request('http://localhost:3001/api/newUser', {
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
                            else if(data.message === 1) {
                                setExceptions({emailInUse: "emailInUse"});
                            }
                            else {
                                var request = new Request('http://localhost:3001/api/send-verification-email', {
                                                method: 'POST',
                                                headers: new Headers({'Content-Type': 'application/json'}),
                                                body: JSON.stringify({email: userInfo.email})
                                            })
                                            fetch(request)
                                                .then(function(response) {
                                                    response.json()
                                                        .then(function(data) {
                                                            console.log(data.message)
                                                            if(data.message === "email send") {
                                                                const address = "http://localhost:3000/verify-email/" + data.token;
                                                                emailjs.send("service_qzwhlos","template_q7npdqh",{
                                                                      message: address,
                                                                      from_email: "stavaws@gmail.com",
                                                                      to_email: userInfo.email
                                                                      })
                                                                      .then(
                                                                        () => {
                                                                          console.log('SUCCESS!');
                                                                        },
                                                                        (error) => {
                                                                          console.log('FAILED...', error.text);
                                                                        },
                                                                      );
                                                                navigate('/RegisteredSuccessfully')
                                                            }
                                                        })
                                                })
                            }
                        })
                })
        }
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
                        {exceptions.password && <span className="text-danger">Password must contain at least one uppercase letter, one digit, one special character or underscore,
                        and is at least 7 characters long</span>}
                        {exceptions.emailInUse && <span className="text-danger">Email Already in use</span>}
                        {exceptions.internal && <span className="text-danger">Internal Error</span>}
                    </div>
                    <button className="btn btn-success w-100">Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default UserRegister;