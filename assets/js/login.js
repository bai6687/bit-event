// 去注册
$('.login a').click(function () {
    $('.login').hide().next().show()
})
// 去登录
$('.register a').click(function () {
    $('.register').hide().prev().show()
})
// 登录
$('.login').on('submit', 'form', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    // console.log(data);

    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/login',
        type: 'post',
        data: data,
        success: function (res) {
            console.log(res);
            if (res.status == 0) {
                layui.msg(res.message)
                localStorage.setItem('token', res.token)
                // live server模式下 /代表根目录big-event
                location.href = '/index.html'
            }

        }
    });
})
// 表单验证
// 使用layui内置模块，必须先加载模块
let form = layui.form;
form.verify({
    // 规则：['验证规则','规则不通过时的提示']
    pwd: [/^[\S]{6,12}$/, '密码至少6-12位且不能出现空格']，
    repwd: function (val) {
        let pwd = $('.register .pwd').val()
        if (val !== pwd) {
            return '密码不一致'
        }
    }
})

// 注册
$('.register').on('submit', 'form', function (e) {
    e.preventDefault();
    let data = $(this).serialize()
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        type: 'post',
        data: data,
        success: function (res) {
            console.log(res);
            if (res.status == 0) {
                layui.msg(res.message)
                // 清空表单内容
                $('.register form')[0].reset()
                // 跳转至登录页面
                $('.register a').click()
            }
        }
    })
})
