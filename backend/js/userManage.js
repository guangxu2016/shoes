$(function () {
    // 获取呈现数据
    var getUserData = function (pageNum) {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            success: function (data) {
                var userManageList = template('usermanage-template', data);
                // 把拿到的数据插入到页面中 HTML append
                $("table tbody").html(userManageList);
                // 分页
                $(".pagination").bootstrapPaginator({
                    // 当前使用的是3版本的bootstrap
                    bootstrapMajorVersion: 3,
                    /*配置的字体大小是小号*/
                    size: 'small',
                    /*当前页*/
                    currentPage: data.page,
                    /*一共多少页*/
                    // 总页数=数据的总数/每页显示多少条数据
                    totalPages: Math.ceil(data.total / data.size),
                    onPageClicked: function (event, originalEvent, type, page) {
                        /*改变当前页再渲染 page当前点击的按钮的页面*/
                        getUserData(page);
                    }
                })
            }
        })
    }
    // 页面载入完成 调用ajax 呈现数据
    getUserData();

    $("tbody").on("click", ".btn", function () {
        var id = $(this).data("id");
        var name = $(this).data("name");
        var isDelete = $(this).hasClass("btn-danger") ? 1 : 0;
        if (isDelete == 1) {
            $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>你确定要启用' + name + '吗？');
        } else {
            $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>你确定要禁用' + name + '吗？');
        }

        $('#manage-modal').on('click', '.btn-primary', function () {
            $.ajax({
                type: 'post',
                url: ' /user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                dataType: 'json',
                success: function (data) {
                    // console.log(data);
                    // getUserManageData();
                    if (data.success == true) {
                        $('#manage-modal').modal('hide');
                        getUserManageData();
                    }
                }
            })
        })
    })


    //  闭合最后   
})