let form = layui.form;
// 验证输入内容
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码长度必须6-12位且不能出现空格'],
    // 判断新密码是否与原密码相同
    diff: function (val) {
        let oldPwd = $('input[name = oldPwd]').val();
        if (val === oldPwd) {
            return '新密码不能与原密码相同'
        }
    },
    // 判断两次输入的新密码是否相同
    same: function (val) {
        let newPwd = $('input[name = newPwd]').val();
        if (val !== newPwd) {
            return '两次输入的密码不一致'
        }
    }

})
$('form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize()
    $.ajax({
        url: '/my/updatepwd',
        type: 'post',
        data: data,
        success: function (res) {
            // console.log(res);
            if (res.status === 0) {
                $('.reset').trigger('click')
                layer.msg(res.message)
            }
        }
    });
})