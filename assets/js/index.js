function renderIndex() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            // 用户名
            $('.info .username').text(res.data.username)
            // 渲染头像
            let avator = res.data.user_pic;
            if (avator) {
                $('.info img').show().attr('src', avator).siblings('.avator').hide();
            } else {
                let first = res.data.username.substr(0, 1).toUpperCase()
                $('.info .avator').text(first)
                $('.info img').hide().siblings('.avator').css('display', 'inline-block');
            }

        }
    });
}
renderIndex()
// 退出登录
$('.logout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        location.href = '/login.html'
        localStorage.removeItem('token')
        layer.close(index);
    });
})
