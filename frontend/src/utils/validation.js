const isUsernameValid = username => {
    return username.trim().length > 3 && username.trim().length < 20;
}

const isEmailValid = email => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

const isPasswordValid = password => {
    return password.trim().length > 7;
}



export { isUsernameValid, isEmailValid, isPasswordValid };
