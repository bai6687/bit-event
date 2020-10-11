let form = layui.form;
// 获取分类并渲染到下拉框
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        console.log(res);
        let html = template('tpl-cate', res)
        $('select').html(html)
        form.render('select')
    }
})

// ---------内容区更换富文本
initEditor()

// 剪裁区域
// 1. 初始化图片裁剪器
let $image = $('#image');
// 2. 裁剪选项
let options = {
    // 宽高比例
    aspectRatio: 400 / 280,
    // 预览区
    preview: '.img-preview'
}
// 3. 初始化裁剪区域
$image.cropper(options)

// 选择图片
$('button:contains("选择封面")').on('click', function () {
    $('#file').trigger('click')
})
$('#file').on('change', function () {
    let fileobj = this.files[0];
    let url = URL.createObjectURL(fileobj)
    $image.cropper('destroy').attr('src', url).cropper(options)
})

// -------------添加文章
$('form').on('submit', function (e) {
    e.preventDefault();
    //  let fd = new FormData(dom对象)
    let fd = new FormData(this)
    // 替换formdata里面的一项
    fd.set('content', tinyMCE.activeEditor.getContent())

    // 剪裁图片
    let canvas = $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    })
    // 把图片转成blob形式
    canvas.toBlob(function (blob) {
        // console.log(blob);
        // fd追加blob
        fd.append('cover_img', blob)


        // 遍历fd对象，查看是否获取到数据
        fd.forEach((val, key) => {
            console.log(key, val);
        })

        // 发送ajax请求，添加文章
        $.ajax({
            url: '/my/article/add',
            type: 'post',
            data: fd,
            // 提交FormData数据，必须添加下面两个选项
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message);
                if (res.status === 0) {
                    location.href = '/article/article.html'
                }
            }
        });

    })

})

