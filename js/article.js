//新闻详情页面
$(document).ready(function () {
    var id = $.cookie('artiId');
    var number = $.cookie('pageNum');

    $.ajax({
        type: 'post',
        url: ' /ShowBriefArticle',
        dataType: 'json',
        data: {
            pageNum: number
        },
        success: function (data) {
            if (data.status === 200) {
                var article = data.jsonStrArray.artiList[id];

                var title = article.artiTitle;
                var articleId = article.artiId;
                var time = article.pubTime.split('T')[0];
                var admin = article.adminName;
                var data = article.artiData;

                $('.main .title p').text(title);
                $('.main .b-pubtime').text(time);
                $('.main .b-pubname').text(admin);
                $('.main .content').html(data);
            }
            else {
                alert(data.errMsg + data.status);
            }
        },
        error: function (jqXHR) {
            alert('未知错误：' + jqXHR.status);
        }
    });
})