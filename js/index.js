//登录注册
$(document).ready(function () {
    $(function () {
        if ($.cookie('username') && $.cookie('username') !== 'null') {
            $('.navbar .navbar-right').html('<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'
                + $.cookie('username') +
                '</a><ul class="dropdown-menu"><li><a class="exit">退出登录</a></li> </ul></li>');
        }
    })

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

    // 修改密码弹出框
    function resetOpen() {
        var mask = $('.mask');
        var reset = $('.reset');

        var sWidth = $(document.body).outerWidth();
        var sHeight = $(document.body).outerHeight();
        var cHeight = $(window).height();
        var lWidth = reset.width();
        var lHeight = reset.height();
        var left = (sWidth - lWidth) / 2;
        var top = (cHeight - lHeight) / 2;

        mask.css({
            'display': 'block',
            'width': 'sWidth' + 'px',
            'height': 'sHeight' + 'px'
        });

        reset.css({
            'display': 'flex',
            'top': top + 'px',
            'left': left + 'px'
        });
    }

    function resetClose() {
        var mask = $('.mask');
        var reset = $('.reset');
        mask.css('display', 'none');
        reset.css('display', 'none');
    }

    $('.logBody .forget').click(function () {
        logClose();
        resetOpen();
    });
    $('.close').click(function () {
        resetClose();
    });
    $('.mask').click(function () {
        resetClose();
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
                placement: "right",
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
        var reg = /[0-9a-zA-Z_\@\.\+\-]{1,20}/;
        return reg.test(str);
    }

    //验证密码格式
    function checkPassword(pwdInput) {
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
        var reg = /[0-9a-zA-Z_\@\.\+\-]{1,20}/;
        return reg.test(str);
    }

    //判断两次密码是否相同
    function checkPwdAgain(pwdVal, pwdAgainInput) {
        var pwdValAgain = pwdAgainInput.val().trim();

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
        return true;
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
                    username = data.jsonStr.userName;
                    $.cookie('username', username, '{path:"/"}');
                    $.cookie('token', data.token, '{path:"/"}');

                    logClose();

                    $('.navbar .navbar-right').html('<li><a>' + username + '</a></li>');
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
                if (data.status === 601) {
                    regClose();

                    alert(data.errMsg);
                }
                else if (data.status === 602) {
                    alert(data.errMsg + '剩余验证码可输入次数' + data.remainNum);
                }
                else if (data.status === 603) {
                    alert(data.errMsg + '请重新获取验证码！');
                }
                else if (data.status === 605) {
                    alert(data.errMsg + '请重新获取验证码！');
                }
            },
            error: function (jqXHR) {
                alert('未知错误:' + jqXHR.status);
            }
        })
    }

    //后台返回找回密码状态
    function resetVerif() {
        $.ajax({
            type: 'post',
            url: '/forgetPassword',
            dataType: 'json',
            data: {
                userId: $('.resetEmail input').val()
            },
            success: function (data) {
                if (data.status === 601) {
                    alert(data.errMsg);
                }
                else {
                    alert(data.errMsg);
                }
            },
            error: function (jqXHR) {
                alert('未知错误：' + jqXHR.status);
            }
        })
    }

    //后台返回修改密码
    function resetPwd() {
        $.ajax({
            type: 'post',
            url: '/resetPassword',
            dataType: 'json',
            data: {
                userPassword: $('.resetPwd input').val(),
                verifyCode: $('.resetVerif input').val(),
                userId: $('.resetEmail input').val()
            },
            success: function (data) {
                if (data.status === 601) {
                    resetClose();
                    alert(data.errMsg);
                }
                else if (data.status === 602) {
                    alert(data.errMsg + '剩余输入次数' + data.remainNum);
                }
                else if (data.status === 603) {
                    alert(data.errMsg + '请重新获取验证码！');
                }
                else {
                    alert(data.errMsg + '请重新获取验证码！');
                }
            },
            error: function (jqXHR) {
                alert('hello');
                alert('未知错误：' + jqXHR.status);
            }
        })
    }

    //触发登录框中的函数
    $('.logPwd input').click(function () {
        var logInput = $('.logEmail input');
        checkEmail(logInput);
    });
    $('.logFooter button').click(function () {
        login();
    });

    //触发注册框中的函数
    $('.regUser input').click(function () {
        var regBtn = $('.regEmail input');
        checkEmail(regBtn);
    });
    $('.regPwd input').click(function () {
        checkUserName();
    });
    $('.regPwdAgain input').click(function () {
        var pwdInput = $('.regPwd input');
        checkPassword(pwdInput);
    });
    $('.regVerif button').click(function () {
        regVerif();
    });
    $('.regFooter button').click(function () {
        alert('hello');
        regConfirm();
    })

    //触发修改密码中的函数
    $('.resetPwd input').click(function () {
        var resetInput = $('.resetEmail input');
        checkEmail(resetInput);
    });
    $('.resetPwdAgain input').click(function () {
        var pwdInput = $('.resetPwd input');
        checkPassword(pwdInput);
    });
    $('.resetFooter button').click(function () {
        var pwdAgainInput = $('.resetPwdAgain input')
        var pwdVal = $('.resetPwd input').val().trim();

        checkPwdAgain(pwdVal, pwdAgainInput);
        resetPwd();
    });
    $('.resetVerif button').click(function () {
        resetVerif();
    });

    //退出登录框(动态生成元素的事件绑定方式)
    $(document).on('click', '.exit', function () {
        $('.navbar .navbar-right').html('<li id="header-register"><a href="#">注册</a></li><li id="header-signin"><a href="#">登录</a></li>');
        $.cookie('username', null);
        $.cookie('token', null);
    })
});
