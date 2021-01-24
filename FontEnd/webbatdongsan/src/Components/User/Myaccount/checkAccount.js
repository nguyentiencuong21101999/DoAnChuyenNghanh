let check = () => {
    let arr = []

    let fullname = document.getElementById('fullname');
    let password = document.getElementById('password');
    console.log(fullname);

    let msg_fullname = document.getElementById('msg_fullname')
    let msg_password = document.getElementById('msg_password')

    if (fullname.value.length <= 3 || fullname.value.length >= 25) {
        msg_fullname.innerHTML = '* Tên Phải Từ 3 => 25 kí tự'
        fullname.style.border = " 1px solid red"

    } else {
        msg_fullname.innerHTML = ''
        arr.push("1");
        fullname.style.border = " 1px solid #ced4da"
    }

    if (password.value.length <= 6 || password.value.length >= 20) {
        msg_password.innerHTML = '* Tên Phải Từ 6 => 20 kí tự'
        password.style.border = " 1px solid red"

    } else {
        msg_password.innerHTML = ''
        arr.push("2");
        password.style.border = " 1px solid #ced4da"
    }
    if (arr.length === 2) {
        return true
    } else {
        return false
    }
}
export default check

