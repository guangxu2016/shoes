$(function() {
    getDetailData();
})

var getDetailData = function() {
    console.log(1)

    var url = new URLSearchParams(location.search);
    var id = url.get("id");

    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:id
        },
        success:function(data) {
            console.log(data);
            var detail = template("detailTemplate",data);
            $(".lt-detail").html(detail);

            // 鞋码
            var size = data.size;
            // console.log(size);
            var first = size.slice(0,2);
            // console.log(first);
            var second = size.slice(3,5);
            // console.log(second);
            var obj = {
                arr:[first,second]
            };
            var sizeList = template("sizeTemplate",obj);

            $(".detail-size").append(sizeList);
            

        }
    })
    console.log(2)
}