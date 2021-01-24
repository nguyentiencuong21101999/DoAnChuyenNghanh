let validateRegister = () => {
    const arr = [];

    let fullname = document.getElementById('fullname');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let confirmpassword = document.getElementById('confirmpassword');
    let msg = document.getElementById('msg');

    let msg_fullname = document.getElementById('msg_fullname');
    let msg_name = document.getElementById('msg_name');

    let msg_username = document.getElementById('msg_username');
    let msg_user = document.getElementById('msg_user');

    let msg_password = document.getElementById('msg_password');
    let msg_pass = document.getElementById('msg_pass');

    //text !== ""

    //----------------fullname ----------------
    if (fullname.value === "") {
        fullname.style.border = "2px solid red";

    }else{
        fullname.style.border = '1px solid #ced4da';
        arr.push('1');
    }
    
    
    if(fullname.value.length >=1 && fullname.value.length <= 3  || fullname.value.length > 25  ){
        msg_fullname.style.display = "block"
        msg_name.innerHTML =" tên của bạn phải từ  3 =>  25 kí tự"
    }else{
        msg_fullname.style.display = "none"
        arr.push('2');  
    }
//----------------username ----------------
    if (username.value === "") {
        username.style.border = "2px solid red";
    }else{
        username.style.border = '1px solid #ced4da';
        arr.push('3');
    }

    if(username.value.length >=1 && username.value.length <= 3  || username.value.length > 25  ){
        msg_username.style.display = "block"
        msg_user.innerHTML =" tên tài khoản phải từ 3 =>  25 kí tự"
    }else{
        msg_username.style.display = "none"
        arr.push('4');  
    }
//----------------password ----------------

    if (password.value === "") {
        password.style.border = "2px solid red";
    }else{
        password.style.border = '1px solid #ced4da';
        arr.push('5');
    }
    if(password.value.length >=1 && password.value.length < 6  || password.value.length > 25  ){
        msg_password.style.display = "block"
        msg_pass.innerHTML =" mật khẩu phải từ 6 =>  25 kí tự"
    }else{
        msg_password.style.display = "none"
        arr.push('6');  
    }


    if (confirmpassword.value === "") {
        confirmpassword.style.border = "2px solid red";
    }else{
        confirmpassword.style.border = '1px solid #ced4da';
        arr.push('7');
        if(password.value !== confirmpassword.value ){
            msg.innerHTML = " ! Mật Khẩu Không Trùng Khớp"
         
        }else{
            msg.innerHTML = ""
            arr.push('8');
        }
    }
    //pass === confirm
    console.log(arr);
    if(arr.length === 8){
        return true;

    }
    else{
        return false;
    }
   

    

}
export default validateRegister;