// 获取剪裁区域的dom元素
let $image = $('#image')
// 配置选项
const option = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
// 创建裁剪区域
$image.cropper(option)

$('#file').change(function () {
    // 3.1) 先找到文件对象
    // console.dir(this)
    var fileObj = this.files[0];
    // 3.2) 为选择的图片生成一个临时的url
    var url = URL.createObjectURL(fileObj);
    // 3.3) 更换图片的src属性即可（销毁剪裁区 --> 更换src属性 --> 重新创建剪裁框）
    $image.cropper('destroy').attr('src', url).cropper(option);
});
$('.upload').on('click', function () {
    var canvas = $image.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    });
    $('#file').click()
    var base64 = canvas.toDataURL('image/png');
    $.ajax({
        url: '/my/update/avatar',
        type: 'post',
        data: { avatar: base64 },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 重新渲染父页面的头像
                window.parent.getUserInfo();
            }
        }
    });
})