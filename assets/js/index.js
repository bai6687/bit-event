function renderIndex() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            let avator = res.data.user_pic;
            if (avator) {
                $('.info img').show().attr('src', avator).siblings().hide();
            } else {
                let first = res.data.username.substr(0, 1).toUpperCase()
                $('.info span').text(first)
                $('.info img').hide().siblings().css('display', 'inline-block');
                // $('.info span').css('display', 'inline-block').siblings().hide()
            }
            $('.info .username').text(res.data.username)
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
