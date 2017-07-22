// $(document).ready(function () {
//     var a = $(window).height();  //浏览器可视区高度
//     var b = $(document).height();  //浏览器当前窗口高度
//     var c = $(document.body).height();  //浏览器当前窗口文档body高度
//     var d = $(document.body).outerHeight();  //获取窗口文档body的总高度，包括border和padding
//     alert('浏览器高度：' + a);
//     alert('浏览器当前窗口高度：' + b);
//     alert('浏览器当前窗口文档body高度：'　+ c);
//     alert('网页正文全文宽：' + d);
// })

// $(document).ready(function () {

//     function open() {
//         var mask = $('.mask');
//         var login = $('.log');

//         var sWidth = $(document.body).outerWidth();
//         var sHeight = $(document.body).outerHeight();
//         var cHeight = $(window).height();
//         var lWidth = login.width();
//         var lHeight = login.height();
//         var left = (sWidth - lWidth) / 2;
//         var top = (cHeight - lHeight) / 2;

//         mask.css({
//             'display': 'block',
//             'width': 'sWidth' + 'px',
//             'height': 'sHeight' + 'px'
//         });

//         login.css({
//             'display': 'flex',
//             'top': top + 'px',
//             'left': left + 'px'
//         });
//     }

//     function close() {
//         var mask = $('.mask');
//         var login = $('.log');
//         mask.css('display', 'none');
//         login.css('display', 'none');
//     }

//     $('#login').click(function () {
//         open();
//     });

//     $('.close').click(function () {
//         close();
//     });

//     $('.mask').click(function () {
//         close();
//     });
// });

// $(document).ready(function () {

//     function regOpen() {
//         var mask = $('.mask');
//         var reg = $('.register');

//         var sWidth = $(document.body).outerWidth();
//         var sHeight = $(document.body).outerHeight();
//         var cHeight = $(window).height();
//         var lWidth = reg.width();
//         var lHeight = reg.height();
//         var left = (sWidth - lWidth) / 2;
//         var top = (cHeight - lHeight) / 2;

//         mask.css({
//             'display': 'block',
//             'width': 'sWidth' + 'px',
//             'height': 'sHeight' + 'px'
//         });

//         reg.css({
//             'display': 'flex',
//             'top': top + 'px',
//             'left': left + 'px'
//         });
//     }

//     function regClose() {
//         var mask = $('.mask');
//         var reg = $('.register');
//         mask.css('display', 'none');
//         reg.css('display', 'none');
//     }

//     $('#reg').click(function () {
//         regOpen();
//     });

//     $('.close').click(function () {
//         regClose();
//     });

//     $('.mask').click(function () {
//         regClose();
//     });

$(document).ready(function () {
    var string = ['大家哈迪噢扫ID梵高还得分工好大夫', '杰克金多或若过或错', 'q','2','r','sdfsdf','wqwq'];
    var str = string[0].substr(0, 10);
    alert(str);
});
