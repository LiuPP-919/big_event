$(function() {
    $.ajaxPrefilter(function(option) {

            option.url = "http://api-breakingnews-web.itheima.net" + option.url
            console.log(option.url);
        })
        // a链接的点击事件
    $(".login-a-first").on("click", function() {
        $(".reg").show()
        $(".login").hide()
    })
    $(".login-a-last").on("click", function() {
        $(".reg").hide()
        $(".login").show()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须是6-12位，请重新输入'],
            repwd: function(value) {
                //密码框的值
                var pwd = $(".reg [name=password]").val()
                if (value != pwd) {
                    return '两次输入的密码不一致，请重新输入'
                }
            }
        })
        //监听注册表单的请求
    $(".form-reg").on("submit", function(e) {
            e.preventDefault()
            var data = {
                    username: $('.reg [name=username]').val(),
                    password: $('.reg [name=password]').val()
                }
                // console.log(data);
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                } else {
                    layer.msg('注册成功，请登录！')
                    $(".login-a").click()
                }
            })
        })
        //监听登录事件
    $(".form-login").on("submit", function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: "/api/login",
            data: data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg('登录失败！')
                } else {
                    layer.msg('登录成功！')
                        // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    localStorage.setItem('token', res.token)
                        // 跳转到后台主页
                    location.href = 'index.html'
                }
            }
        })
    })

})