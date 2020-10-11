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

// -----------------------------点击上传，选择图片
$('.upload').on('click', function () {
    $('#file').trigger('click')
})
// 更换剪裁区图片
$('#file').change(function () {
    // console.dir(this)
    // 找到文件对象
    var fileObj = this.files[0];
    // 为选择的图片生成一个临时的url
    var url = URL.createObjectURL(fileObj);
    // 更换图片的src属性（销毁剪裁区 --> 更换src属性 --> 重新创建剪裁框）
    $image.cropper('destroy').attr('src', url).cropper(option);
});

// ------------------------------点击确定，完成更换
$('.reAvator').on('click', function () {
    var canvas = $image.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    });
    var base64 = canvas.toDataURL('image/png');
    $.ajax({
        url: '/my/update/avatar',
        type: 'post',
        data: { avatar: base64 },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 重新渲染父页面的头像
                window.parent.renderIndex();
            }
        }
    });
})