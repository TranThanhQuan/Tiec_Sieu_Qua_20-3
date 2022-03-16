$('.lichsu-btn').click(function(){
    swal(
        {
            title: "Thông báo !",
            text: "Bạn cần đăng nhập để tham gia sự kiện !",
            buttons : {
                comfirm: "Đăng nhập"
            }
        });
});




$(document).ready(function() {
    getDataClient();
    getListRank();
});




function getDataClient (){

    $.getJSON('http://loanthe.gamota/api/getDataClient.php', function(data) {


        let exchange_award = data.data.exchange_award;
        $.each(exchange_award, function(key, value){
            let sent = `Đã đổi ${value.sent}/${value.max}`;
            let id_addr = `${key+1}`;
            let diemdoi = `${value.req} điểm đổi`;            
            $("#doiqua-sent"+id_addr).html(sent);
            $("#diemdoi"+id_addr).html(diemdoi);
            

            var dadoi;
            if (value.sent < value.max) {
                
                dadoi = `<img src="assets/img/nhanqua-btn.png" class="bottom__card-btn" alt="">`;
            }
            else{
                dadoi = `<img src="assets/img/danhan-btn.png" class="bottom__card-btn" alt="">`;
            }
            $("#doiqua-btn"+id_addr).html(dadoi);

        });



        // login
        let user_login = data.data.user_login;
        console.log(user_login);

        if(user_login.is_login == 0){
            $('#dangnhap').attr("class", "show");
            $('#dangnhap-mob').attr("class","show-navbar");

            // Nếu chưa đăng nhập thì lượt tặng hoa = 0
            let luottanghoa = `Bạn có: 0 Lượt Tặng`;
            $("#luottanghoa").html(luottanghoa);
            $("#luottang-mob").html(luottanghoa);

            

            // Nếu chưa đăng nhập thì điểm thân mật = 0
            let diemthanmat = `Bạn có: 0 Điểm thân mật`;
            $("#diemthanmat").html(diemthanmat);
            $("#diemthanmat-top").html(diemthanmat);
            $("#diemthanmat-bottom").html(diemthanmat);

            // console.log("1");
        }

        else{
            let username = user_login.username;
            $('#dangxuat').attr("class", "show");
            $('#dangxuat-mob').attr("class","show-navbar");
            $("#username").html(username);
            
            let luottanghoa = `Bạn có: ${data.data.turn_remain} Lượt Tặng`;
            $("#luottanghoa").html(luottanghoa);
            $("#luottang-mob").html(luottanghoa);

            
            let diemthanmat = `Bạn có: ${data.data.point} Điểm thân mật`;
            $("#diemthanmat").html(diemthanmat);
            $("#diemthanmat-top").html(diemthanmat);
            $("#diemthanmat-bottom").html(diemthanmat);


            // console.log("2");
        }
    });
};








function getListRank (){

    $.getJSON('http://loanthe.gamota/api/getListRank.php', function(data) {

    let rank = data.rank;
    var html = '';
    $.each(rank, function(key, value){

    html += `<tr>
                <td>${key+1}. ${value.role_name}</td>
                <td>${value.server}</td>
                <td>${value.point}</td>
             </tr>` ;

    $("#bxh").html(html);
        }) 
    
    });
}















// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
// $(document).ready(function() {
//     getdataapi();
//     apiboyte();
// });


// function getdataapi (){

//     $.getJSON('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh', function(data) {

//         var date = data.datetime.slice(8, 10);
//         var month = data.datetime.slice(5, 7);
//         var year = data.datetime.slice(0, 4);
//         var h = data.datetime.slice(11, 13);
//         var m = data.datetime.slice(14, 16);
//         var s = data.datetime.slice(17, 19);

//         // console.log(h)  
//         // console.log(m)  
//         // console.log(s)  
//         // console.log(data.datetime)
        


//         let apidata = `Múi giờ: ${data.abbreviation} GMT<br>
//                         Địa chỉ IP: ${data.client_ip} <br>
//                         Ngày trong tuần: ${data.day_of_week} <br>  
//                         Ngày trong năm: ${data.day_of_year}<br>
//                         Tuần trong năm: ${data.week_number}<br>
//                         Khu vực: ${data.timezone} <br>
//                         Ngày: ${date}-${month}-${year}<br>
//                         Giờ: ${h}:${m}:${s}<br>`
//         $("#api-test").html(apidata);
//         setTimeout(getdataapi, 1000); //recursive call

//         // console.log(data)

//     });
// }
// //  NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN


// // API BỘ Y TẾ
// function apiboyte (){

//     $.getJSON('https://owsnews.herokuapp.com/covid?fbclid=IwAR1uea3hK4g7uwv4dKEhYEk-OB4Pr82tKpuV8QFWAawWvUsUBi92_z-_Ops', function(data) {
//         let source = `${data.source_covid}<br>`;
//         let dulieu = data.data;
//         var boyte = '';

//         let table_title =   `<tr>
//                                 <th>Tỉnh</th>
//                                 <th>Nhiễm</th>
//                                 <th>Tử vong</th>
//                                 <th>Tổng nhiễm</th>
//                                 <th>Tổng tử vong</th>
//                             </tr>`

//         $.each(dulieu, function(key, value){
//         boyte += `
        
//         <tr>
//             <td>${key+1}. ${value.tinh}</td>
//             <td>${value.nhiem}</td>
//             <td>${value.tuvong}</td>
//             <td>${value.tong_nhiem}</td>
//             <td>${value.tong_tuvong}</td>
//         </tr>` ;

//         // $("#sourceboyte").html(source);
//         // $("#api-boyte").html(boyte);
//         $("#title").html(table_title);

//         console.log(boyte)
//         })

//     });
// }


