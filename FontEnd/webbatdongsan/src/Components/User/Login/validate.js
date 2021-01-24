let validateLogin = () => {
    const arr =[];
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    if(username.value === ""){
        username.style.border = '2px solid red'
    }
    else{
        username.style.border = '1px solid #ced4da'
        arr.push('1')
    }
    if(password.value === ""){
        password.style.border = '2px solid red'
    }
    else{
        password.style.border = '1px solid #ced4da'
        arr.push('2')
    }
    if(arr.length ===2){
        return true;
    }else{
        return false;
    }
}

export default validateLogin;