$(document).ready(function () {

    // 登录弹出框
    function logOpen() {
        var mask = $('.mask');
        var login = $('.log');

        var sWidth = $(document.body).outerWidth();
        var sHeight = $(document.body).outerHeight();
        var cHeight = $(window).height();
        var lWidth = login.width();
        var lHeight = login.height();
        var left = (sWidth - lWidth) / 2;
        var top = (cHeight - lHeight) / 2;

        mask.css({
            'display': 'block',
            'width': 'sWidth' + 'px',
            'height': 'sHeight' + 'px',
            'top': 0,
            'left': 0
        });
        login.css({
            'display': 'flex',
            'top': top + 'px',
            'left': left + 'px'
        });
    }

    function logClose() {
        var mask = $('.mask');
        var login = $('.log');
        mask.css('display', 'none');
        login.css('display', 'none');
    }

    $('#header-signin').click(function () {
        logOpen();
    });

    $('.close').click(function () {
        logClose();
    });

    $('.mask').click(function () {
        logClose();
    });

    // 注册弹出框
    function regOpen() {
        var mask = $('.mask');
        var reg = $('.register');

        var sWidth = $(document.body).outerWidth();
        var sHeight = $(document.body).outerHeight();
        var cHeight = $(window).height();
        var lWidth = reg.width();
        var lHeight = reg.height();
        var left = (sWidth - lWidth) / 2;
        var top = (cHeight - lHeight) / 2;

        mask.css({
            'display': 'block',
            'width': 'sWidth' + 'px',
            'height': 'sHeight' + 'px'
        });

        reg.css({
            'display': 'flex',
            'top': top + 'px',
            'left': left + 'px'
        });
    }

    function regClose() {
        var mask = $('.mask');
        var reg = $('.register');
        mask.css('display', 'none');
        reg.css('display', 'none');
    }

    $('#header-register').click(function () {
        regOpen();
    });
    $('.close').click(function () {
        regClose();
    });
    $('.mask').click(function () {
        regClose();
    });


    // 验证邮箱内容
    function checkEmail(btn) {
        var emailVal = btn.val().trim();

        if (!emailVal) {
            btn.css({
                'border-color': 'red'
            });
            btn.popover({
                content: "邮箱不能为空！",
                placement: "right"
            });
            btn.popover('show');
            return false;
        } else if (!isEmail(emailVal)) {
            btn.css({
                'border-color': 'red'
            });
            btn.popover({
                content: "邮箱格式不正确！",
                placement: "right"
            });
            btn.popover('show');
            return false;
        } else if (emailVal && isEmail(emailVal)) {
            btn.css({
                'border-color': '#ccc'
            });
            btn.popover('hide');
        }
        return true;
    }
    //验证邮箱格式的合法性
    function isEmail(str) {
        var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return reg.test(str);
    }

    //验证用户名内容
    function checkUserName() {
        var nameInput = $('.regUser input');
        var nameVal = nameInput.val().trim();

        if (!isUserName(nameVal)) {
            nameInput.css({
                'border-color': 'red'
            });
            nameInput.popover({
                content: "用户名格式不正确！",
                placement: "right"
            });
            nameInput.popover('show');
            return false;
        }
        return true;
    }
    //验证用户名合法性
    function isUserName(str) {
        var reg = /[0-9a-zA-Z_\@\.\+\-]{1,30}/;
        return reg.test(str);
    }

    //验证密码格式
    function checkPassword() {
        var pwdInput = $('.regPwd input');
        var pwdVal = pwdInput.val().trim();

        if (!isPassword(pwdVal)) {
            pwdInput.css({
                'border-color': 'red'
            });
            pwdInput.popover({
                content: "密码格式不正确！",
                placement: "right"
            });
            pwdInput.popover('show');
            return false;
        }
        return true;
    }
    //验证密码合法性
    function isPassword(str) {
        var reg = /[0-9a-zA-Z_\@\.\+\-]{1,30}/;
        return reg.test(str);
    }

    //判断两次密码是否相同
    function checkPwdAgain() {
        var pwdVal = $('.regPwd input').val().trim();
        var pwdAgainInput = $('.regPwdAgain input');
        var pwdValAgain = $('.regPwdAgain input').val().trim();
        if (pwdVal !== pwdValAgain) {
            pwdAgainInput.css({
                'border-color': 'red'
            });
            pwdAgainInput.popover({
                content: "两次密码不匹配！",
                placement: "right"
            });
            pwdAgainInput.popover('show');
            return false;
        }
    }

    //后台返回登录验证信息
    function login() {
        $.ajax({
            type: "post",
            url: "/userLogin",
            dataType: "json",    //指定数据处理方式
            data: {
                userId: $('.logEmail input').val(),
                userPassword: $('.logPwd input').val()
            },
            success: function (data) {
                if (data.status === 601) {
                    alert(data.errMsg + data.status + "欢迎" + data.jsonStr.userName);
                    $.cookie('userId', $('.logEmail input').val(), '{path:"/"}');
                    $.cookie('token', data.token, '{path:"/"}');
                }
                else {
                    alert(data.errMsg + data.status);
                }
            },
            error: function (jqXHR) {
                alert("未知错误" + jqXHR.status);
            }
        })
    }

    //后台获取邮箱信息并发送验证码
    function regVerif() {
        $.ajax({
            type: 'post',
            url: '/userRegister',
            dataType: 'json',
            data: {
                userId: $('.regEmail input').val()
            },
            success: function (data) {
                if (data.status === 601) {
                    alert(data.errMsg + "请查看邮箱！");
                }
                else {
                    alert(data.errMsg + '请输入其他邮箱！');
                }
            },
            error: function (jqXHR) {
                alert('未知错误' + jqXHR.status);
            }
        })
    }

    //后台确认注册信息
    function regConfirm() {
        $.ajax({
            type: 'post',
            url: '/confirmRegister',
            dataType: 'json',
            data: {
                userPassword: $('.regPwd input').val(),
                verifyCode: $('.regVerif input').val(),
                userName: $('.regUser input').val(),
                userId: $('.regEmail input').val()
            },
            success: function (data) {
                if(data.status === 601) {
                    alert(data.errMsg);
                }
                else if(data.status === 602) {
                    alert(data.errMsg + '剩余验证码可输入次数' +data.remainNum);
                }
                else if(data.status === 603) {
                    alert(data.errMsg + '请重新获取验证码！');
                }
                else if(data.status === 605) {
                    alert(data.errMsg + '请重新获取验证码！');
                }
            },
            error: function(jqXHR) {
                alert('未知错误:' + jqXHR.errMsg);
            }
        })
    }


    $('.logPwd input').click(function () {
        var logInput = $('.logEmail input');
        checkEmail(logInput);
    });
    $('.regUser input').click(function () {
        var regBtn = $('.regEmail input');
        checkEmail(regBtn);
    });
    $('.logFooter button').click(function () {
        login();
    });
    $('.regPwd input').click(function () {
        checkUserName();
    });
    $('.regPwdAgain input').click(function () {
        checkPassword();
    });
    $('.regVerif button').click(function () {
        checkPwdAgain();
    });
    $('.regVerif button').click(function () {
        regVerif();
    });
    $('.regFooter button').click(function () {
        regConfirm();
    });
});
