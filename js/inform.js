$(document).ready(function () {
    //新闻列表
    var page = 1;
    var pageNumber = 0;

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

                    pageNumber = pageNum;

                    for (var i = 0; i < articleLen; i++) {
                        var article = list[i].artiTitle.artiData.replace(re1, '');
                        var inform = '<div class="col-sm-6 col-md-4"><div class="thumbnail"><div class="caption"><h3><a id="' + list[i].artiId + '">'
                            list[i].artiTitle + '</a></h3><p>' + article.substr(0, 50) + '</p></div></div></div>'
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

    $('.next').click(function () {
        $(function getArticle(page) {
            page++;

            if (page > pageNum) {
                alert('已经到文章最后一页~');
                return true;
            }

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

                        var article = list[0].artiTitle.artiData.replace(re1, '');
                        var inform = '<div class="col-sm-6 col-md-4"><div class="thumbnail"><div class="caption"><h3><a id="' + list[i].artiId + '">' +
                            list[0].artiTitle + '</a></h3><p>' + article.substr(0, 50) + '</p></div></div></div>';
                        $('.main .content').html(inform);

                        for (var i = 1; i < articleLen; i++) {
                            var article = list[i].artiTitle.artiData.replace(re1, '');
                            var inform = '<div class="col-sm-6 col-md-4"><div class="thumbnail"><div class="caption"><h3>' +
                                list[i].artiTitle + '</h3><p>' + article.substr(0, 50) + '</p></div></div></div>';
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
    });

    $('.previous').click(function () {
        $(function getArticle(page) {
            page--;

            if (page === 0) {
                alert('已经到文章第一页~');
                return true;
            }

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

                        var article = list[0].artiTitle.artiData.replace(re1, '');
                        var inform = '<div class="col-sm-6 col-md-4"><div class="thumbnail"><div class="caption"><h3><a id="' + list[i].artiId + '">' +
                            list[0].artiTitle + '</a></h3><p>' + article.substr(0, 50) + '</p></div></div></div>';
                        $('.main .content').html(inform);

                        for (var i = 1; i < articleLen; i++) {
                            var article = list[i].artiTitle.artiData.replace(re1, '');
                            var inform = '<div class="col-sm-6 col-md-4"><div class="thumbnail"><div class="caption"><h3><a>' +
                                list[i].artiTitle + '</a></h3><p>' + article.substr(0, 50) + '</p></div></div></div>';
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
    });

    // 新闻详情页面跳转
    $('.col-sm-6 .caption h3 a').on('click',function () {
        var articleId = $(this).attr('id');
        var url = 'article.html?artiId=' +  articleId;
        window.open(url);
    })
});