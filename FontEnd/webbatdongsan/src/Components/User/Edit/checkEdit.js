

let checkPost = () => {
    let arr = [];
    let arr_1 = [];
    let arr_2 = [];
    let arr_3 = [];
    let arr_4 = [];

    let kind = document.getElementById('kind');
    let name = document.getElementById('name');
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let content = document.getElementById('content');
    let price = document.getElementById('price');
    let unit = document.getElementById('unit');
    let address = document.getElementById('address');
    let size = document.getElementById('size');
    let bath = document.getElementById('bath');
    let bad = document.getElementById('bad')
    let name_user = document.getElementById('name_user');
    let phone = document.getElementById('phone');

    if (unit.value === "Thỏa Thuận" && name.value === "Đất Nền"  //Điều Kiện
        && kind.value !== "" && title.value !== "" && description.value && content.value !== ""
        && address.value !== ""
        //&& price.value === ""
        && size.value !== "0" && bath.value === "0" && bad.value === "0"
        && name_user.value !== "" && phone.value !== ""
    ) {
        arr_1.push("true");
    }


    if (unit.value === "Triệu" && name.value === "Đất Nền"  //Điều Kiện
        && kind.value !== "" && title.value !== "" && description.value && content.value !== ""
        && address.value !== ""
        && price.value !== "0"
        && size.value !== "0" && bath.value === "0" && bad.value === "0"
        && name_user.value !== "" && phone.value !== ""
    ) {
        arr_3.push("true");
    }
    
    if (unit.value === "Tỷ" && name.value === "Đất Nền"  //Điều Kiện
        && kind.value !== "" && title.value !== "" && description.value && content.value !== ""
        && address.value !== ""
        && price.value !== "0"
        && size.value !== "0" && bath.value === "0" && bad.value === "0"
        && name_user.value !== "" && phone.value !== ""
    ) {
        arr_4.push("true");
        console.log(4);
    }
    if (
        unit.value === "Thỏa Thuận" //Điều Kiện
        && kind.value !== "" && name.value !== "" && title.value !== "" && description.value && content.value !== ""
        && address.value !== ""
        //&& price.value === ""
        && size.value !== "0" && bath.value !== "0" && bad.value !== "0"
        && name_user.value !== "" && phone.value !== ""
    ) {
        arr_2.push("true");
    }
    if (kind.value === "") {
        kind.style.border = "2px solid red";

    } else {
        kind.style.borderColor = "white"
        arr.push("1")
    }
    if (name.value === "") {
        name.style.border = "2px solid red"

    }
    else {
        name.style.borderColor = "white"
        arr.push("2")
    }

    if (title.value === "") {
        title.style.border = "2px solid red"
    }
    else {
        title.style.borderColor = "white"
        arr.push("3")
    }

    if (description.value === "") {
        description.style.border = "2px solid red"

    }
    else {
        description.style.borderColor = "white"
        arr.push("4")
    }

    if (content.value === "") {
        content.style.border = "2px solid red"

    }
    else {
        content.style.borderColor = "white"
        arr.push("5")
    }

    if (price.value === "0") {
        price.style.border = "2px solid red"
    }
    else {
        price.style.borderColor = "white"
        arr.push("14")
    }

    if (unit.value === "") {
        unit.style.border = "2px solid red"

    }
    else {
        unit.style.borderColor = "white"
        arr.push("14")
    }




    if (address.value === "") {
        address.style.border = "2px solid red"

    }
    else {
        address.style.borderColor = "white"
        arr.push("7")
    }

    if (size.value === "0") {
        size.style.border = "2px solid red"

    }
    else {
        size.style.borderColor = "white"
        arr.push("8")
    }

    if (bath.value === "0" || bath.value === "") {
        bath.style.border = "2px solid red"

    }
    else {
        bath.style.borderColor = "white"
        arr.push("9")
    }

    if (bad.value === "0" || bad.value === "") {
        bad.style.border = "2px solid red"

    }
    else {
        bad.style.borderColor = "white"
        arr.push("10")
    }
    if (size.value === "0") {
        size.style.border = "2px solid red"

    }
    else {
        size.style.borderColor = "white"
        arr.push("11")
    }
    if (name_user.value === "") {
        name_user.style.border = "2px solid red"

    }
    else {
        name_user.style.borderColor = "white"
        arr.push("12")
    }

    if (phone.value === "") {
        phone.style.border = "2px solid red"

    }
    else {
        phone.style.borderColor = "white"
        arr.push("13")
    }
    //|| arr_1.length === 1 || arr_2.length === 1 || arr_3.length === 1
    if (arr.length === 14 || arr_1.length === 1 || arr_3.length === 1 || arr_2.length === 1 ||arr_4.length === 1) {
        console.log(true);
        return true;
    } else {
        console.log(false);
        return false

    }

}

export default checkPost