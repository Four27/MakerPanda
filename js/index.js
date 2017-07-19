$(document).ready(function () {
    // 登录
    function open() {
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

    function close() {
        var mask = $('.mask');
        var login = $('.log');
        mask.css('display', 'none');
        login.css('display', 'none');
    }

    $('#header-signin').click(function () {
        open();
    });

    $('.close').click(function () {
        close();
    });

    $('.mask').click(function () {
        close();
    });


    // 注册
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
});

