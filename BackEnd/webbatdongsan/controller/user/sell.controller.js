
const detail = require('../../models/web/detail');
const Detail = require('../../models/web/detail');
const Home = require('../../models/web/home');
// 
module.exports.search = async function (req, res) {
    // let txtSearch = req.body.txtSearch;
    // let page_size = 10;
    // let page = req.body.page;
    // let soluongboqua = (page - 1) * page_size;

    // if (txtSearch) {
    //     let sumPage = 0; //tong trang
    //     let sumNews = 0; // tong san pham
    //     const regex = new RegExp(fullTextSearchVi(txtSearch), 'i');
    //     await Detail.find({ title: regex, kind: "Cho Thuê" }, (err, data) => {
    //         sumPage = Math.ceil(data.length / page_size);
    //         sumNews = data.length;
    //     })
    //     await Detail.find(
    //         { title: regex, kind: "Cho Thuê" }
    //     )
    //         .skip(soluongboqua)
    //         .limit(page_size)
    //         .then(
    //             (data) => {
    //                 // console.log(data.length);
    //                 res.send([data, sumPage, sumNews])
    //             }
    //         )
    // } else {
    //     const kind = req.body.kind;
    //     let sumPage = 0; //tong trang
    //     let sumNews = 0; // tong san pham
    //     //lay tong so san pham trong mogo
    //     await Detail.find({ kind: kind }, (err, data) => {
    //         sumPage = Math.ceil(data.length / page_size) // tính tổng số trang = tong san pham / san pham tren 1 trang
    //         sumNews = data.length;
    //     })
    //     await Detail.find({ kind: kind })
    //         .skip(soluongboqua)
    //         .limit(page_size).sort(
    //         )
    //         .then(
    //             (data) => {
    //                 res.send([data, sumPage, sumNews])
    //             }
    //         )
    // }
}

module.exports.filter = async (req, res) => {
    await Home.find().then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err);
    })
}
// phải nhận đồng thời 6 giá trị và truy vấn theo 6 giá trị đó
// nếu 1 giá trị  = [] thì set where <price.length < 0>
// đói với GIÁ và DIỆN TÍCH thì trả về ALL <=> price > 0 && size > 0 
//đối với String "abc" => thì trả về ALL <=> title = "ALL" trong CSDL;
//  Truy vấn theo 6 giá trị    =>> title
//                            =>> giá       
//                            =>> diện tích       
//                            =>> địa chỉ     
//                            =>> lọc    
//                            =>> loại   
// table.find( 
//  loai:"cần bán",
// $and:[
//           {
//              $or:[{title: gt1 },{title:gt2}]
//             }
//           {
//              $or: [{price: gt1 },{price:gt2}
//           }  
//          
//
//       ]     
//
module.exports.postFilter = async (req, res) => {
    let page_size = 10;
    let page = req.body[6].page;
    let soluongboqua = (page - 1) * page_size;

    let sumPage = 0; //tong trang
    let sumNews = 0; // tong san pham

    let arr_address = [];
    const title = req.body[0];
    const price = req.body[1];
    const size = req.body[2];
    const address = req.body[3];
    const sort = req.body[4];
    const kind = req.body[5];
    const txtSearch = req.body[7];
    
    await Home.find().then(data => {
        arr_address = data[0].city
    })

    let queryTitle = () => {
        let query = [];
        if(txtSearch !== '' ){
            const search = txtSearch.split((/[\s,]+/))
            if(search.length > 2){
                search.splice(0, 2)
            }
            let strSearch = search[0] + " " + search[1]
            const regex = new RegExp(fullTextSearchVi(strSearch), 'i')
            let where ={
                title:{$regex:txtSearch,$options:'i'},
                title:regex
            }   
            query.push(where)
        }
        if (query.length > 0 || title.length > 0) {
            for (let i = 0; i < title.length; i++) {
                let where = {
                    title: title[i]
                }
                query.push(where)
            }
            return query;
        } else {
            return [
                { title: "Bất Động Sản Nổi Bật" },
                { title: "Căn Hộ Trung Cư" },
                { title: "Căn Hộ Mini" },
                { title: "Căn Hộ Tập Thể" },
                { title: "Đất Nền" }

            ]
        }

    }
    // let querySearch = () =>{
    //     console.log(txtSearch);
    //     const regex = new RegExp(fullTextSearchVi(txtSearch), 'i');
    //     let query = [];
    //     let where = {
    //         title: {$regex:txtSearch,$options}
    //     }
    //     query.push(where);
    //     return query;
        
    // }
    let queryPrice = () => {
        let query = [];
       
        if (price.length > 0) {
            for (let i = 0; i < price.length; i++) {
                let prices = price[i].split((/[\s,]+/))
                let where = {

                    price: {
                        $gte: parseInt(prices[0]),  // > value
                        $lte: parseInt(prices[1])  // < value
                    }
                }
                query.push(where);
            }
            return query;

        } else {
            return [{ price: { $gte: 0 } }];
        }
      
    }
    let querySize = () => {
        let query = [];
        if (size.length > 0) {
            for (let i = 0; i < size.length; i++) {
                let sizes = size[i].split((/[\s,]+/));
                let where = {
                    size: {
                        $gte: parseInt(sizes[0])
                        , $lte: parseInt(sizes[1])
                    }
                }
                query.push(where)
            }

            return query;
        } else {
            return [{ size: { $gte: 0 } }]
        }

    }
    let queryAddress = () => {
        let query = [];
        if (address.length > 0) {
            for (let i = 0; i < address.length; i++) {
                let where = {
                    adress: { $regex: address[i], $options: 'i' }
                }
                query.push(where);
            }
            return query;
        } else {
            let query = [];
            for (let i = 0; i < arr_address.length; i++) {
                let where = {
                    adress: { $regex: arr_address[i], $options: 'i' }
                }
                query.push(where)
            }
            return query;

        }

    }

    let querySort = () => {
        if (sort.length > 0) {
            let sorts = sort[0].split((/[\s,]+/))
            let query;
            if (sorts[0] === "null") {
                return null;
            }
            if (sorts[0] === "price") {
                let value = parseInt(sorts[1]);
                query = { price: value }
                return query;
            } else {
                let value = parseInt(sorts[1]);
                query = { size: value }
                return query;
            }
        } else {
            return null;
        }
    }
    //Hiển thị tổng sản phầm khi truy vấn  ( => phải truy vấn để hiển thị tất cả sản phẩm)
    await Detail.find(
        {   
            kind: kind,
            active: true,
            $and:
                [
                    // {
                    //     $or:[
                    //         {
                    //             title:{$regex:"Căn Hộ Mini",$options:'i'} 
                    //         }
                    //     ]
                    //     // querySearch()
                    // },
                    {
                        $or: queryTitle()
                    }
                    ,
                    {
                        $or: queryPrice()
                    },
                    {
                        $or: querySize()
                    },
                    {
                        $or: queryAddress()
                    }

                ]
        }
        , (err, data) => {
            // tổng sản phâm  = 25
            sumPage = Math.ceil(data.length / page_size); // tổng trang 25/10= 3(làm tròn lên)
            sumNews = data.length; // tổng sản phẩm hiển thị trên client
        }
    )
    await Detail.find(
        {
            kind: kind,
            active: true,
            $and:
                [
                    // {
                    //     $or:[
                    //         {
                    //             title:{$regex:/căn hộ trung cư/,$options:'i'} 
                    //         }
                    //     ]
                    //     //querySearch()
                    // },
                    {
                        $or: queryTitle()
                    }
                    ,
                    {
                        $or: queryPrice()
                    },
                    {
                        $or: querySize()
                    },
                    {
                        $or: queryAddress()
                    }

                ]
        }
    ) // tổng số sản phẩm = 25
        .skip(soluongboqua) // soluongboqua = (page - 1) * page_size;  => bỏ qua 10
        .limit(page_size)  // giới hạn sản phẩm => sp = 10
        .sort(querySort()).then((data) => {
            // console.log(a);
            //console.log(data.length);
            res.send([data, sumPage, sumNews])
        })

}