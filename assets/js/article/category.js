// 渲染文章列表
function renderCategory() {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            $('tbody').html(template('tpl-categoty', res))
        }
    });
}
renderCategory()
// -----------删除文章类别
$('body').on('click', 'button:contains("删除")', function () {
    let Id = $(this).data("id")
    layer.confirm('确定要删除此分类吗?', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            url: '/my/article/deletecate/' + Id,
            success: function (res) {
                // console.log(res);
                if (res.status === 0) {
                    renderCategory()
                }
            }
        })
        layer.close(index);
    });

})

let layIndex;

// -------------------添加文章类别--点击出现弹层
$('.addCate').on('click', function () {
    layIndex = layer.open({
        type: 1,
        title: '添加文章分类',
        area: ['500px', '250px'],
        content: $('#tpl-add').html()
    });
})
// 添加文章类别--确认添加
$('body').on('submit', '.addForm', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    console.log(data);
    $.ajax({
        url: '/my/article/addcates',
        type: 'post',
        data: data,
        success: function (res) {
            if (res.status === 0) {
                renderCategory()
            }
            layer.close(layIndex)
        }
    })
})

// -------------------编辑文章类别--点击编辑按钮，出现弹层
$('body').on('click', 'button:contains("编辑")', function () {
    let data = $(this).data()
    data.Id = data.id
    console.log(data);
    layIndex = layer.open({
        type: 1,
        title: '修改文章分类',
        area: ['500px', '250px'],
        content: $('#tpl-update').html(),
        success: function () {
            // $('input[name=name]').val(data.name);
            // $('input[name=alias]').val(data.alias);
            // $('input[name=id]').val(data.id);
            // 数据回填
            let form = layui.form;
            form.val('update', data)
        }
    });
})
// 编辑文章类别--确认修改
$('body').on('submit', '.updateForm', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    // data.id = data.Id;
    // console.log(data);
    $.ajax({
        url: '/my/article/updatecate',
        type: 'post',
        data: data,
        success: function (res) {
            // console.log(res);
            if (res.status === 0) {
                layer.close(layIndex)
                renderCategory()
            }
        }
    })
})

