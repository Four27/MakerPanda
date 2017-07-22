$(document).ready(function () {
    function getArticle() {
        $.ajax({
            type: 'post',
            url: ' /ShowBriefArticle',
            dataType: 'json',
            data: {
                pageNum: 2
            },
            success: function (data) {

            }
        })
    }
});