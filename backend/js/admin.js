// 该文件是用来写首页的js交互的
// 进度条
// 不要让进度条显示圆圈
NProgress.configure({ showSpinner: false });

// 1.全局监听 当页面中某一个ajax请求发起的时候 让进度条开始
$(window).ajaxStart(function () {
    NProgress.start();
})

$(window).ajaxComplete(function () {
    NProgress.done();
})


// 2.点击左侧的菜单按钮 让左侧的侧边栏消失，让右侧的内容沾满全屏

$("[data-menu]").on("click", function () {
    $(".aside").toggle();
    $(".section").toggleClass("menu");
})

// 3.点击分类管理 滑出 菜单
$(".aside .menu").on("click", '[href="javascript:;"]', function () {
    var _this = $(this);

    var child = _this.siblings();
    // 用于切换   slideUp sideDown
    child.slideToggle();
})

// 4.退出
$("#myModal").on("click", ".btn-primary", function () {
    $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        data: {},
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                $("#myModal").modal("hide");
                setTimeout(function () {
                    location.href = "./login.html";
                }, 500)
            }
        }
    })
})
