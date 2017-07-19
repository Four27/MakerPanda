var popupLog = {
    createElms: function () {
        $('<div class="log"><div class="content"><div class="logHeader"><button type="button" class="close"><span>&times;</span></button><img src="images/logo.png" alt="logo"></div><div class="logBody"><form><div class="input-group input-group-lg"><span class="input-group-addon"><label class="glyphicon glyphicon-user"></label></span><input type="text" class="form-control" placeholder="输入邮箱" aria-describedby="sizing-addon1"> </div> <div class="input-group input-group-lg"><span class="input-group-addon"><label class="glyphicon glyphicon-lock"></label></span><input type="text" class="form-control" placeholder="输入密码" aria-describedby="sizing-addon1"></div><div class="forget"><a>忘记密码？</a></div></form></div><div class="logFooter"><button type="button" class="btn btn-primary">登 录</button></div></div></div>')
            .appendTo('body')
    }
}

$(function() {
    $('#header-signin').onclick = function() {
        popupLog.createElms();
    }
})