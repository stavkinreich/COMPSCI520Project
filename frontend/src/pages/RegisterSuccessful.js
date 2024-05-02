import React from 'react';
import Navbar from '../components/Navbar/Navbar.js'


function RegisterSuccessful() {
    return (
    <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: "#3E2751"}}>
                <div className="bg-white p-3 rounded w-25">
                    <h1 className="text-center">Form Submitted Successfully</h1>
                    <h3 className="text-center">Check your email for validation and login</h3>
                </div>
            </div>
    </div>
    );
}

export default RegisterSuccessful;