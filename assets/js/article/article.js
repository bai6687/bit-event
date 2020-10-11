// 加载内置模块
let laypage = layui.laypage;
let form = layui.form;
// 初始化页码值，默认显示第一页，每页显示2条数据
let data = {
    pagenum: 1,
    pagesize: 2
}
// 获取文章列表
function renderArticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            // console.log(res);
            let html = template('article', res)
            $('tbody').html(html)
            // 分页
            showPage(res.total)
        }
    });
}
renderArticle()
// 分页渲染
function showPage(total) {
    laypage.render({
        elem: 'page', //这里的 page 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        limit: data.pagesize,//每页显示的条数
        limits: [2, 3, 5, 10],//每页条数选择,layout参数开启limit才会显示
        curr: data.pagenum,//当前页
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],//skip:快捷跳页
        // 分页触发时执行--函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
        jump: function (obj, first) {//第一次执行first为true;之后都为undefined
            if (!first) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                // 刷新页面不执行
                renderArticle()
            }
        }
    });
}
// 获取文章分类
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        // console.log(res);
        let html = template('category', res)
        $('.category').html(html)
        // 重新渲染下拉框
        form.render('select', 'category')
    }
})
// 筛选
$('form').on('submit', function (e) {
    e.preventDefault()
    let formArr = $(this).serializeArray()
    // console.log(formArr);
    $.each(formArr, function (i, item) {
        data[item.name] = item.value;
    })
    console.log(data);
    data.pagenum = 1;
    renderArticle()

})

// 注册模板过滤器--格式化日期
template.defaults.imports.dateFormat = function (time) {
    let date = new Date(time)
    let y = date.getFullYear();
    let M = addZero(date.getMonth() + 1);
    let d = addZero(date.getDate());
    let h = addZero(date.getHours());
    let m = addZero(date.getMinutes());
    let s = addZero(date.getSeconds());

    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
}
function addZero(n) {
    return n < 10 ? '0' + n : n;
}

// 删除文章
$('body').on('click', 'button:contains("删除")', function () {
    let id = $(this).data('id')
    layer.confirm('确定要删除此文章吗?', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            url: '/my/article/delete/' + id,
            success: function (res) {
                if (res.status === 0) {
                    renderArticle()
                }
            }
        })
        layer.close(index);
    });
})


// 编辑文章