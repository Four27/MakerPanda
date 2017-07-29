//新闻列表显示
$(document).ready(function () {
    var page = 1;
    var pageNumber = 0;

    //默认第一页
    $(function getArticle(page) {
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
                        var inform = $('<div class="col-sm-6 col-md-4 item"><div class="thumbnail"><div class="caption"><h3><a class="1" id="' + count + '">' +
                            list[i].artiTitle + '</a></h3><p>' + article.substr(0, 110) + '...</p></div></div></div>');

                        inform.appendTo('.main .content');
                        count++;
                    }

                    $('.main .content').masonry({
                        itemSelector: '.item'
                    });

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

                    $('.main .content').empty();

                    for (var i = 0; i < articleLen; i++) {
                        var article = list[i].artiData.replace(re1, '');
                        var inform = $('<div class="col-sm-6 col-md-4 item"><div class="thumbnail"><div class="caption"><h3><a class="1" id="' + count + '">' +
                            list[i].artiTitle + '</a></h3><p>' + article.substr(0, 110) + '...</p></div></div></div>');

                        inform.appendTo('.main .content');
                        count++;
                    }

                    var $grid = $('.main .content').masonry({
                        itemSelector: '.item',
                        percentPosition: true
                    });

                    $('.main .content').height('100%');

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

    //上一页
    function preArticle() {
        if (page === 1) {
            alert('已经到文章第一页~');
            return true;
        }

        page--;

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

                    $('.main .content').empty();

                    for (var i = 0; i < articleLen; i++) {
                        var article = list[i].artiData.replace(re1, '');
                        var inform = $('<div class="col-sm-6 col-md-4 item"><div class="thumbnail"><div class="caption"><h3><a class="1" id="' + count + '">' +
                            list[i].artiTitle + '</a></h3><p>' + article.substr(0, 110) + '...</p></div></div></div>');

                        inform.appendTo('.main .content');
                        count++;
                    }

                    $('.main .content').masonry({
                        itemSelector: '.item'
                    });

                    $('.main .content').height('100%');

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
        nextArticle();
    });

    $('.previous').click(function () {
        preArticle(page);
    });


    // 新闻详情页面跳转
    $(document).on('click', '.col-sm-6 h3 a', function () {
        var id = $(this).attr('id');
        var number = $(this).attr('class');

        $.cookie('artiId', id, { path: "/" });
        $.cookie('pageNum', number, { path: "/" });

        var url = 'article.html';
        window.open(url);
    })
});