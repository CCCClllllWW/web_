$(function () {
  //点击"去注册账号"的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  //点击"去登录"的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 从layui中获取form对象

  var form = layui.form
  var layer = layui.layer
  // 通过form.verify()函数自定义校验规则

  form.verify({
    // 自定义了一个叫pwd的校验规则
    pwd: [/^[\S]{6,12}$/, '密码长度必须在6-12位，且不能出现空格'],
    // 校验两次输入密码是否一致的规则
    repwd: function (value) {
      //通过形参拿到的是确认密码框之中的内容
      //还要拿到密码框之中的内容
      //然后进行一次判断
      //如果判断失败则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd != value) {
        return '两次输入密码不一致!'
      }
    }
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        // return console.log(res.message);
        return layer.msg(res.message)
      }
      // console.log('注册成功');
      layer.msg('注册成功!请登录')
      //模拟文档点击成功
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    // 阻止默认提交行为  
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败!')
        }
        layer.msg('登陆成功!')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = './index.html'
      }

    })


  })
})

// git
//     先将login提交到本地仓库
//         git add .
//         git commit -m 登陆注册已完成
    
//     合并到master
//         git checkout master
//         git merge login

//     将本地仓库推送到远程仓库
//         git push http://.... master
//         git push http://.... login

// 开始新的分支实现index
//     git branch index
//     git checkout index
