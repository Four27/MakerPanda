//新闻列表显示
$(document).ready(function () {
    var page = 1;
    var pageNumber = 0;

    //默认第一页
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
                    var re1 = /<.+?>/g;
                    var pageNum = parseInt(data.jsonStrArray.artiNum / 15);
                    var pagemode = data.jsonStrArray.artiNum % 15;
                    var count = 0;

                    if (pagemode !== 0) {
                        pageNum = pageNum + 1;
                    }

                    pageNumber = pageNum;

                    $('.main .content').empty();

                    for (var i = 0; i < articleLen; i++) {
                        var article = list[i].artiData.replace(re1, '');
                        var time = list[i].pubTime.split('T')[0];
                        var inform = '<div class="col-md-12 item"><div class="thumbnail"><div class="caption"><h3><a class="1" id="' + count + '">' +
                            list[i].artiTitle + '</a></h3><p>' + article.substr(0, 200) + '...</p></div><p class="pub"><label class="glyphicon glyphicon-calendar"></label><b>' +
                            time + '</b><label class="glyphicon glyphicon-user"></label><b>' + list[i].adminName + '</b></p></div></div>';


                        $('.main .content').append(inform);
                        count++;
                    }
                    // pinterest();
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

    //下一页
    function nextArticle() {
        if (page === pageNumber) {
            alert('已经到文章最后一页~');
            return true;
        }
        page++;

        newArticle(page);
    }

    // 上一页
    function preArticle() {
        if (page === 1) {
            alert('已经到文章第一页~');
            return true;
        }

        page--;

        newArticle(page);
    }

    // function pinterest() {
    //     $('.main .content').masonry({
    //         itemSelector: '.item'
    //     });
    // }

    function newArticle(page) {
        $('.main .content').empty();
        $.ajax({
            type: 'post',
            url: ' /ShowBriefArticle',
            dataType: 'json',
            data: {
                pageNum: page
            },
            success: function (data) {
                if (data.status === 200) {
                    var list = data.jsonStrArray.artiList;
                    var articleLen = list.length;
                    var re1 = new RegExp("<.+?>", "g");
                    var count = 0

                    for (var i = 0; i < articleLen; i++) {
                        var article = list[i].artiData.replace(re1, '');
                        var time = list[i].pubTime.split('T')[0];
                        var inform = '<div class="col-md-12 item"><div class="thumbnail"><div class="caption"><h3><a class="' + page + '" id="' + count + '">' +
                            list[i].artiTitle + '</a></h3><p class="line">' + article.substr(0, 200) + '...</p></div><p class="pub"><label class="glyphicon glyphicon-calendar"></label><b>' +
                            time + '</b><label class="glyphicon glyphicon-user"></label><b>' + list[i].adminName + '</b></p></div></div>';


                        $('.main .content').after(inform);
                        count++;
                    }
                    // pinterest();
                }
                else {
                    alert(data.errMsg + data.status);
                }
            },
            error: function (jqXHR) {
                alert('未知错误：' + jqXHR.status);
            }
        });
    }

    $('.next').click(function () {
        nextArticle(page);
    });

    $('.previous').click(function () {
        preArticle(page);
    });

    // 新闻详情页面跳转
    $(document).on('click', '.col-md-12 h3 a', function () {
        var id = $(this).attr('id');
        var number = $(this).attr('class');

        $.cookie('artiId', id, { path: "/" });
        $.cookie('pageNum', number, { path: "/" });

        var url = 'article.html';
        window.open(url);
    })
});