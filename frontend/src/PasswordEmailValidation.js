function PasswordEmailValidation(userInfo) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;
    let exceptions = {};
    if(userInfo.email === "" || !emailRegex.test(userInfo.email)) {
        exceptions.email = "invalid email";
    }
    if(userInfo.password === "" || !passwordRegex.test(userInfo.password)) {
        exceptions.password = "invalid password";
    }
    return exceptions;
}

export default PasswordEmailValidation;