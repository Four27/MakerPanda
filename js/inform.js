$(document).ready(function () {
    $(function getArticle() {
        $.ajax({
            type: 'post',
            url: ' /ShowBriefArticle',
            dataType: 'json',
            data: {
                pageNum: 1
            },
            success: function (data) {
                if (data.status === 200) {
                    var list = data.jsonStrArray.artiList;
                    var articleLen = list.length;
                    var re1 = new RegExp("<.+?>", "g");
                    var pageNum = parseInt(data.jsonStrArray.artiNum / 15);
                    var pagemode = data.jsonStrArray.artiNum % 15;
                    var count = 1;

                    if (pagemode !== 0) {
                        pageNum = pageNum + 1;
                    }

                    for (var n = 0; n < pageNum; n++) {
                        $('.page .pagination').append('<li><a href="#">' + count + '</a></li>');
                        count++;
                    }
                    $('.page ul').append('<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');

                    for (var i = 0; i < articleLen; i++) {
                        var article = list[i].artiTitle.artiData.replace(re1, '');
                        var inform = '<div class="col-sm-6 col-md-4"><div class="thumbnail"><div class="caption"><h3>' +
                            list[i].artiTitle + '</h3><p>' + article.substr(0, 50) + '</p></div></div></div>'
                        $('.main .content').append(inform);
                    }
                }
                else {
                    alert(data.errMsg + data.status);
                }
            },
            error: function (jqXHR) {
                alert('未知错误：' + jqXHR.status);
            }
        });
        
    });


    // var string = ['大家哈迪噢扫ID梵高还得分工好大夫', '杰克金多或若过或错', 'q', '2', 'r', 'sdfsdf'];
    // var num = parseInt(string.length / 2);
    // var num2 = string.length % 2;
    // alert(num2);


    // var count = 1;
    // for (var n = 0; n < 4; n++) {
    //     $('.page ul').append('<li><a href="#">' + count + '</a></li>')
    //     count++;
    // }
    // $('.page ul').append('<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>')
});