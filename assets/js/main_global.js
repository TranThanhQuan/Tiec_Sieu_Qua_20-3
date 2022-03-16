/*
* FACEBOOK SDK
* @param appId, version
*/

/*
"use strict";
window.fbAsyncInit = function() {
    FB.init({
      appId      : '892979244555582',
      xfbml      : true,
      cookie     : true,
      version    : 'v7.0'
    });
};
(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/

/* END OF FACEBOOK SDK ================================================================== */

/*
* Show hien thi thong bao cho User
* @param (json) response
* @param (string) callback
*/
function show_result(response, callback){//Hien thi thong bao
    var title_choose, title_arr;
    title_arr = ['Lỗi !', 'Chúc mừng !','Thông báo', 'Thông báo !'];
    title_choose = ( typeof response.title == "undefined" ? title_arr[response.status] : response.title );

    let className='',text='Ok',btn_ok_visible=true;
    if(response.status==1){
        // className='vq_notice';
        // title_choose='';
    }else{
         text='Ok';
         btn_ok_visible=true; 
    }
    setTimeout(function(){
        var div = document.createElement("div");
        div.innerHTML = response.msg + "<a href='javascript:;' onclick='close_swal()' class=' close_popup'></a>";
        swal({
            title: title_choose,
            content:div,
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
            if( typeof response.reload != 'undefined' ){
                //Lam moi lại trang
                location.reload();
            }
            if( typeof response.redirect !== 'undefined' ){
                //Chuyen huong trang
                window.location.href = response.redirect;
            }
            if (typeof callback !== 'undefined') {
                //Callback function other
                callback();
                return;
            }
        });
    },200);
}
/*
* ShowLogin
*/
function showLogin(){
    var response = {title : 'Thông báo', 'msg' : 'Bạn cần đăng nhập để tham gia sự kiện !', redirect : 'login?state=halloween'};
    show_result(response);return;
}
/*
* showUserInfo
*/
function showUserInfo(){
    var response = {title : 'Thông báo', 'msg' : 'Bạn cần nhập thông tin cá nhân để tham gia sự kiện !'};
    show_result(response, show_userinfo);return;
}

/*
* Popup show_userinfo
*/
function show_userinfo(){
    $('#popupUserinfo').modal('toggle');
}

/*
* Popup The Le show_thele
*/
function show_thele(){
    $('#popupThele').modal('toggle');
}

/*
* Popup Show Logo When AjaxLoad
*/
function loadLogo(){
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
/* Validate Form Data ================================================ */
function validate_form(data){
    if( data.hasOwnProperty('fullname') ){
        if( data.fullname == '' ){show_result({ status: 0, msg: 'Vui lòng nhập đầy đủ Họ Tên !' });return false;}
    }

    if( data.hasOwnProperty('phone') ){
        if( data.phone == '' ){show_result({ status: 0, msg: 'Vui lòng nhập đầy đủ Số Điện Thoại !' });return false;}
    }

    if( data.hasOwnProperty('email') ){
        if( data.email == '' ){show_result({ status: 0, msg: 'Vui lòng nhập đầy đủ Email !' });return false;}
    }

    if( data.hasOwnProperty('server_id') ){
        if( data.server_id == '' || data.server_id == 0 ){show_result({ status: 0, msg: 'Vui lòng nhập đầy đủ Server !' });return false;}
    }

    if( data.hasOwnProperty('role_id') ){
        if( data.role_id == '' || data.role_id == 0 ){show_result({ status: 0, msg: 'Vui lòng nhập đầy đủ Nhân Vật !' });return false;}
    }
    return true;
}

/* BUTTON COPY ==================================================================== */

//Bo sung COPY CLIPBOARD
function copy_clipboard(el, id) {
    // Copy textarea, pre, div, etc.
    if (document.body.createTextRange) {
        // IE 
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.select();
        textRange.execCommand("Copy");
        //tooltip(el, "Copied!");  
    } else if (window.getSelection && document.createRange) {
        // non-IE
        var editable = el.contentEditable; // Record contentEditable status of element
        var readOnly = el.readOnly; // Record readOnly status of element
        el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
        el.readOnly = false; // iOS will not select in a read only form element
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range); // Does not work for Firefox if a textarea or input
        if (el.nodeName == "TEXTAREA" || el.nodeName == "INPUT")
            el.select(); // Firefox will only select a form element with select()
        if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i))
            el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange
        el.contentEditable = editable; // Restore previous contentEditable status
        el.readOnly = readOnly; // Restore previous readOnly status 
        if (document.queryCommandSupported("copy")) {
            var successful = document.execCommand('copy');

            if (successful) console.log('ok'); //tooltip(el, "Copied to clipboard.");
            else console.log('not ok'); //tooltip(el, "Press CTRL+C to copy");
        } else {
            if (!navigator.userAgent.match(/ipad|ipod|iphone|android|silk/i))
                //tooltip(el, "Press CTRL+C to copy");    
                console.log('not ok');
        }
    }
    $('#btn_copy_' + id).html('copied');
} // end function select_all_and_copy(el)

function getCodeTanThu(){
    $.ajax({
        url : root + 'spin/ajax_getGiftTanThu',
        type: 'POST',
        dataType: 'json',
        success: function(response){
            if( response.status == 1 ){
                response.msg = `<p style="color:#000">GiftCode Tân Thủ của bạn là : <span style="font-weight:bold;color:red">${response.giftcode}</span></p>
                <p style="color:#000">GiftCode Chung : <span style="font-weight:bold;color:red">PHONGLANGTHIENHA</span></p>`;
                show_result(response);
            }else{
                response.msg = `<p style="color:#000">GiftCode Chung : <span style="font-weight:bold;color:red">PHONGLANGTHIENHA</span></p>`;
                response.title = 'Thông báo !';
                show_result(response);
            }
        }
    });
}