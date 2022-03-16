"use strict";
window.fbAsyncInit = function() {
    FB.init({
      appId      : '337049367016394',
      xfbml      : true,
      cookie     : true,
      version    : 'v3.2'
    });
};
(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/**
* Int function
*/
loadDataClient();

function loadDataClient(){
    $.ajax({
        url: root + 'spin/ajax_loadDataClient',
        type: 'post',
        dataType: 'json',
        success: function(response) {
            if(response.status == 1){
                var data = response.data;

                $('#turn_remain').text(data.turn_remain);//Lượt mở bao lì xì
                $('#turn_prize').text(data.turn_day);//Lượt mở rương
                $('.point').text(data.material.sum);//Điểm đổi quà
                
                $('#qua').html(data.html_exchange);
                // $('#sale').html(data.html_storesale);
                $('#section3').html(data.html_awardday);

                /*
                $('.wrap_qua').html(data.html_awardsaver);
                $('.turn_used').text(data.turn_used);
                $('.material').html(`
                    <div class="nl"><span>${data.material.canhga}</span> CÁNH</div>
                    <div class="nl"><span>${data.material.duiga}</span> ĐÙI</div>
                    <div class="nl"><span>${data.material.thitga}</span> THỊT</div>
                    <div class="nl"><span>${data.material.changa}</span> CHÂN</div>
                `);//Change mooncake
                */
            }
        }
    });
}
/*========================================================================================================*/
function get_freeturn(){
    if(user_login == 0){ showLogin(); return; }

    $.ajax({
        url : root+'spin/ajaxGetFreeTurn',
        type: 'POST',
        dataType: 'json',
        beforeSend:function(){
            show_dice();
        },
        success: function(response){ 
            close_swal();
            if(response.status == 1){
                $('#turn_remain').text(response.turn_remain);//Change turn
                $('.luot a:nth-child(4)').addClass('active');
            }
            show_result(response);
        }
    });
}
/* END OF SHARE FB ========================================================================= */
function showLogin(){
    var span = document.createElement("span");
    span.innerHTML = "Bạn cần đăng nhập để tham gia sự kiện !" + "<a href='javascript:;' onclick='close_swal()' class='close_popup'></a>";
    swal({
        title: "Thông báo !",
        content:span,
        className: "",
        buttons: {
            confirm:{
                text: "Đăng nhập",//Đăng nhập
                value: "confirm",
                visible: true,
                className: "btn_ok",
                closeModal: true
            }
        },
    }).then((willDelete) => {
        window.location.href = root+'login?state='+link_ev; // +'promise/cleardemo'
    });
}

function show_snow_popup(self=false){
    var response = {status:1, msg:'Test !'};
    var span = document.createElement("span");
    span.innerHTML = response.msg + "<a href='javascript:;' onclick='close_swal()' class=' close_popup'></a>";
    swal({
        title: 'Title',
        content:span,
        className: "snow_popup",
        buttons:{
            confirm:{
                text: "OK",//Đăng nhập
                value: "confirm",
                visible: true,
                className: "btn_ok",
                closeModal: true
            }
        }
    }).then((willDelete) => {
        if( response.status == 2 ){
            location.reload();
        }

        if( typeof response.redirect !== 'undefined' ){
            window.location.href = root + response.redirect;
        }

    });
}

function show_result(response){//Hien thi thong bao
    var title_choose;
    if(response.title == undefined){
        var title = ['Lỗi !', 'Chúc mừng !','Thông báo !', 'Thông báo !'];
        title_choose = title[response.status];
    }else{
        title_choose = response.title;
    }
    let className='',text='',btn_ok_visible=false;
    if(response.status==1){
        className='vq_notice';
        title_choose='';
    }else{
         text='OK';
         btn_ok_visible=true; 
    }
    setTimeout(function(){
        var span = document.createElement("span");
        span.innerHTML = response.msg + "<a href='javascript:;' onclick='close_swal()' class=' close_popup'></a>";
        swal({
            title: title_choose,
            content:span,
            className: className,
            buttons:{
                confirm:{
                    text: text,//Đăng nhập
                    value: "confirm",
                    visible: btn_ok_visible,
                    className: "btn_ok",
                    closeModal: true
                }
            }
        }).then((willDelete) => {
            if( response.status == 2 ){
                location.reload();
            }

            if( typeof response.redirect !== 'undefined' ){
                window.location.href = root + response.redirect;
            }

        });

    },500);
}
/* END AUTO VONG QUAY */

/* BEGIN OF CONFIG VONGQUAY */

function showMdAward(){
    $('#mdShowAward').modal('toggle');
}
/* BEGIN OF SET INFO USER ===================== */
$('#submit-promise').on('click',function(e){
    e.preventDefault();//Chan form submit

    var role_name = $("#choose_role option:selected").html();
    var server_name = $("#server option:selected").html();
    var data_form = $('#promise_frm').serialize() + "&role_name="+role_name+"&server_name="+server_name;  //  + "&role_name="+role_name

    // var data = $('#promise_frm').serialize();
    $.ajax({
        url : root+'spin/ajaxUpdateUserInfo',
        type: 'POST',
        data: data_form,
        dataType: 'json',
        beforeSend:function(){
            show_dice();
        },
        success: function(response){
            close_swal();
            if(response.status == 1){
                $('#user_info').modal('toggle');
            }
            show_result(response);
        }
    });
});

$('#server').change(function(){
    var server_id = $(this).val();
    if(server_id == null || server_id == ''){
        show_result({'status':0, 'msg':'Vui lòng chọn server !'});return;
    }

    var data = { 'server_id': server_id, 'type': 'vipgamota'};
    $.ajax({
        url: root + 'spin/ajax_GetRoleInfo',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function(data) {
            if(data.status == 1){
                $('#choose_role').html(data.html);
            }else show_result(data);
        }
    });
})
/* Show Rank Spin */
function showRank(){
    var rank_html = $('#bxh_inner').html();
    $('#html_bxh').find('.bxh_modal').html(rank_html);
    setTimeout(function(){
        $("#html_bxh").modal('toggle');
    },200);
}
/* Show History Vong Quay */
function showHistory(){
    if(user_login == 0){ showLogin(); return; }
    $.ajax({
        url: root + 'spin/ajaxGetHistory',
        type: 'post',
        data: 'allow=1',
        dataType: 'html',
        beforeSend:function(){
            show_dice();
        },
        success: function(data) {
            $("#html_lichsu").html(data);
            close_swal();
            setTimeout(function(){
                $("#html_lichsu").modal("toggle");
            },200);
        }
    });
}

function showPopupThele(){
    $("#html_thele").modal('toggle');
}
var spinning = 0;
function takeOne(self=false){
    // Kiem tra xem truoc do quay demo chua
    if(spinning == 1){ console.error("Đang ném! Vui lòng đợi..."); return; }

    if(user_login == 0){ showLogin(); return; }
    if(user_info == 0){ $('#user_info').modal('toggle'); return; }
    spinning = 1;//Chuyen qua trang thai dang quay
    $.ajax({
        url : root+'spin/ajax_takeOne',
        type: 'POST',
        data: 'allow='+1,
        dataType: 'json',
        beforeSend:function(){
            show_dice();
        },
        success: function(response){
            if( response.status != 1 ){
                show_result(response);
            }

            if(response.status == 1){
                close_swal();
                $('#qua').html(response.html_exchange);
                $('#turn_remain').text(response.turn_remain);//Change turn
                $('#mooncake').text(response.mooncake);//Change mooncake
                show_result(response);
            }
            spinning = 0;
        },
        complete: function(){
            loadDataClient();
        }
    });
}

/* BEGIN OF QUAY 10 LAN LIEN TIEP */
function takeTen(){
    // Kiem tra xem truoc do quay demo chua
    if(spinning == 1){ console.error("Đang ném! Vui lòng đợi..."); return; }

    if(user_login == 0){ showLogin(); return; }

    if(user_info == 0){ $('#user_info').modal('toggle');return; }
    
    spinning = 1;//Chuyen qua trang thai dang quay

    //Kiem tra xem luot quay lien tiep hien tai bao nhieu
    $.ajax({
        url : root+'spin/ajax_takeTen',
        type: 'POST',
        data: 'allow='+1,
        dataType: 'json',
        beforeSend:function(){
            show_dice();
        },
        success: function(response){
            close_swal();
            if( response.status != 1 ){
                show_result(response);
            }

            if(response.status == 1){
                $('#qua').html(response.html_exchange);
                $('#turn_remain').text(response.turn_remain);//Change turn
                $('#mooncake').text(response.mooncake);//Change mooncake
                show_result(response);
            }
            spinning = 0;
        },
        complete: function(){
            loadDataClient();
        }
    });
}

function changeAwardActive(){
    //Thay doi phan qua trong vong quay
    showQuestChangeAward();
}

function showQuestChangeAward(){
    setTimeout(function(){
        var span = document.createElement("span");
        span.innerHTML = 'Bạn có muốn dùng 1 lượt quay để đổi các phần quà trong vòng quay không ?';
        swal({
            title: 'Thông báo !',
            content:span,
            className: "vq_notice",
            buttons:{
                confirm:{
                    text: "",//Đăng nhập
                    value: "confirm",
                    visible: true,
                    className: "btn_ok",
                    closeModal: true
                },
                cancel:{
                    text: "",//Đăng nhập
                    value: "cancel",
                    visible: true,
                    className: "btn_huy",
                    closeModal: true
                }
            }
        }).then((willDelete) => {
            if( willDelete == 'cancel' ){//Nothing
            }else{//Thuc hien doi vong quay cho User
                ajaxChangeAward();
            }
        });
    },200);
}
function ajaxChangeAward(){
    $.ajax({
        url : root+'spin/ajaxGetAwardActive',
        type: 'POST',
        data: 'allow=1',
        dataType: 'json',
        success: function(response){
            if(response.status == 1){
                $('#turn_remain').text(response.turn_remain);
                $('#spin_item').html(response.html)
            }
            show_result(response);
        }
    });
}
function ajaxExchangeAward(id_award){
    if(user_login == 0){ showLogin(); return; }
    if(user_info == 0){ $('#user_info').modal('toggle');return; }

    $.ajax({
        url : root+'spin/ajaxExchangeAward',
        type: 'POST',
        data: 'id_award='+id_award,
        dataType: 'json',
        beforeSend:function(){
            show_dice();
        },
        success: function(response){
            close_swal();
            if(response.status == 1){
                $('#mooncake').text(response.mooncake);
                $('#qua').html(response.html);
            }
            show_result(response);
        },
        complete: function(){
            loadDataClient();
        }
    });
}
function ajaxBuyAward(id_award){
    if(user_login == 0){ showLogin(); return; }
    if(user_info == 0){ $('#user_info').modal('toggle');return; }

    $.ajax({
        url : root+'spin/ajax_buyItemUseCoin',
        type: 'POST',
        data: 'id_award='+id_award,
        dataType: 'json',
        beforeSend:function(){
            show_dice();
        },
        success: function(response){
            close_swal();
            if(response.status == 1){
                // $('#mooncake').text(response.mooncake);
                // $('#qua').html(response.html);
            }
            show_result(response);
        },
        complete: function(){
            loadDataClient();
        }
    });
}

function show_dice(){
    var div = document.createElement("div");
    div.innerHTML = $('#html_dice').html();
    swal({
        title: ' ',
        content:div,
        className: "dice_prize",
        closeOnClickOutside: false,
        buttons:{
            confirm:{
                text: "Ok",//Đăng nhập
                value: "confirm",
                visible: true,
                className: "btn_confirm",
                closeModal: false
            }
        }
    });
}
window.close_swal = function close_swal() {
    console.log("Closing swal...");
    swal.close();
    return 1;
};

//random number return src img người tuyết active
function generateRange(pCount, pMin, pMax) {
    let min = pMin < pMax ? pMin : pMax;
    let max = pMax > pMin ? pMax : pMin;
    let arrNumber = [], randNumber,arrSrc=[];
    while ( pCount > 0) {
        randNumber = Math.round(min + Math.random() * (max - min));
        if (arrNumber.indexOf(randNumber) == -1) {
            let strStr = root+`static/xmas/img/nt${randNumber}-powder.png`;
            arrNumber.push(randNumber);
            arrSrc.push(strStr);
            
            pCount--;
        }
    }
    return arrSrc;
}
function show_doiqua() {
    $('html, body').animate({ scrollTop: $(".doiqua").offset().top }, 500);
}

function clearWhenOutsideWindow(swiper) {
    let w = window.innerWidth;
    for (let index = 0; index < swiper.slides.length; index++) {
        const currentSlide = swiper.slides[index];
        let r = currentSlide.getBoundingClientRect().right;
        let l = currentSlide.getBoundingClientRect().left;
     
        if(r>w+25 && l>w-25 ){
            let srcImgRemoveActive = $(currentSlide).find('a.nt.active img.active ').attr('src');
            if(typeof srcImgRemoveActive == 'undefined') return;
            let arrImgActive = $('.slider-image img.active');
            for (let index = 0; index <= arrImgActive.length; index++) {
                const imgCurren = arrImgActive[index];
                let srcActive = $(imgCurren).attr('src');
                if(srcActive==srcImgRemoveActive){
                    $(imgCurren).parent().removeClass('active');
                }
            }

            // $(currentSlide).find('a.nt.active').removeClass('active');

        }
    }
}
function getGiftCodeByDay(day_choose){
    if(user_login == 0){ showLogin(); return; }

    if(user_info == 0){ $('#user_info').modal('toggle');return; }

    var data = {day_choose:day_choose};
    $.ajax({
        url : root+'spin/ajax_getGiftByDay',
        type: 'POST',
        data: 'allow='+1,
        dataType: 'json',
        beforeSend:function(){
            show_dice();
        },
        success: function(response){
            close_swal();
            if(response.status != 0){
                //Show Popup Giftcode
                console.log(response);
                // response.reload = 1;
                
                if( (response.key !== 'code_405') && (response.key !== 'code_406') && (response.key !== 'code_407')) {
                    show_result(response);
                } else {
                    show_popup_BuyCodeDay(response);
                }
            }else{
                show_result(response);
            }
        },
        complete: function(){
            loadDataClient();
        }
    });
}

function show_popup_BuyCodeDay(response, callback){//Hien thi thong bao
    setTimeout(function(){
        var div = document.createElement("div");
        div.innerHTML = response.msg + "<a href='javascript:;' onclick='close_swal()' class=' close_popup'></a>";
        swal({
            title: 'Chúc mừng !',
            content: div,
            className: "confirm_buy_item",
            buttons:{
                confirm:{
                    text: "Mua Rương",//Đăng nhập
                    value: "confirm",
                    visible: true,
                    className: "btn_ok",
                    closeModal: true
                },
                cancel:{
                    text: "Hủy",//Đăng nhập
                    value: "cancel",
                    visible: true,
                    className: "btn_huy",
                    closeModal: true
                }
            }
        }).then((willDelete) => {
            if( willDelete == 'confirm' ){
                // console.log(response);
                var key = response.key;
                var key = key.slice(5);
                console.log(key);
                ajaxBuyAward(key);
            }
        });
    },200);
}