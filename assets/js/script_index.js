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
    $.ajax({
        url : 'http://loanthe.gamota/api/getDataClient.php',
        type: 'POST',
        data: 'allow='+1,
        dataType: 'json',
        beforeSend:function(){
            // show_dice();
        },
        success: function(data){

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
                // $('#dangnhap').attr("class", "show");
                $('#dangnhap').addClass("show");
                $('#dangnhap-mob').addClass("show-navbar");


                // Nếu chưa đăng nhập thì lượt tặng hoa = 0
                let luottanghoa = `Bạn có: 0 Lượt Tặng`;
                $("#luottanghoa").html(luottanghoa);
                $("#luottang-mob").html(luottanghoa);


                // Nếu chưa đăng nhập thì điểm thân mật = 0
                let diemthanmat = `Bạn có: 0 Điểm thân mật`;
                $("#diemthanmat").html(diemthanmat);
                $("#diemthanmat-top").html(diemthanmat);
                $("#diemthanmat-bottom").html(diemthanmat);

                console.log("1");
            }

            else{
                let username = user_login.username;
                // $('#dangxuat').attr("class", "show");
                // $('#dangxuat-mob').attr("class","show-navbar");
                $('#dangxuat').addClass("show");
                $('#dangxuat-mob').addClass("show-navbar");

                $("#username").html(username);
                
                let luottanghoa = `Bạn có: ${data.data.turn_remain} Lượt Tặng`;
                $("#luottanghoa").html(luottanghoa);
                $("#luottang-mob").html(luottanghoa);

                
                let diemthanmat = `Bạn có: ${data.data.point} Điểm thân mật`;
                $("#diemthanmat").html(diemthanmat);
                $("#diemthanmat-top").html(diemthanmat);
                $("#diemthanmat-bottom").html(diemthanmat);


                console.log("2");
            }
        },
        complete: function(){
            
        }
    });
}



// function getListRank (){

//     $.getJSON('http://loanthe.gamota/api/getListRank.php', function(data) {

//     let rank = data.rank;
//     var html = '';
//     $.each(rank, function(key, value){

//     html += `<tr>
//                 <td>${key+1}. ${value.role_name}</td>
//                 <td>${value.server}</td>
//                 <td>${value.point}</td>
//              </tr>` ;

//     $("#bxh").html(html);
//         }) 
    
//     });
// }


function getListRank (){
    $.ajax({
        url : 'http://loanthe.gamota/api/getListRank.php',
        type: 'POST',
        data: 'allow='+1,
        dataType: 'json',
        beforeSend:function(){
            // show_dice();
        },
        success: function(data){
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
            
        },
        complete: function(){
            
        }
    });
}

function showUserInfo(){
    $('#user_info').modal('toggle');
}