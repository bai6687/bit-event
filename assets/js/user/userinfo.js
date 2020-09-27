
let form = layui.form;
// 获取用户信息
function getUser() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        success: function (res) {
            // console.log(res);
            form.val("formTest", res.data)
        }
    });
}
getUser();
// 修改用户信息
$('form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize()
    // console.log(data);
    $.ajax({
        url: '/my/userinfo',
        type: 'post',
        data: data,
        success: function (res) {
            // console.log(res);
            if (res.status === 0) {
                window.parent.renderIndex()
                layer.msg(res.message)
            }
        }
    })
})
// 重置用户信息
$('form').on('reset', function () {
    getUser()
})
