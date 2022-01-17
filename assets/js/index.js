$(function () {
  // 调用 getUserInfo获取用户基本信息
  getUserInfo()

  var layer = layui.layer
  //点击按钮 实现退出功能
  $('#btnLogout').on('click', function () {
    //提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      //清空本地储存中的 token
      localStorage.removeItem('token')
      //重新跳转到登录页面
      location.href = './login.html'

      //关闭 confirm 询问框
      layer.close(index)
    })
  })
})
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    //headers 就是请求头配置对象

    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取用户信息失败')
      }
      renderAvatar(res.data)
    }
    // complete:function(res){
    //   console.log(res);
    // }
  })
}
function renderAvatar(user) {
  //获取用户名称
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name.substr(0, 1).toUpperCase()
    console.log(first);
    $('.text-avatar').html(first).show()
  }
}


// git add .
// git commit -m complete admin index.html page
// git push 

// git checkout master
// git merge index

// git push origin master

// git branch user
// git checkout user    git branch user -M
