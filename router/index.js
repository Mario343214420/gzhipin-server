/**
 * Created by Administrator on 2018/12/3.
 */
const express = require('express');
const Users = require('../model/users');
const router = new express.Router();

router.use(express.urlencoded({extended: true}));

router.get('/', (req, res) => {
  res.send('来自服务器的响应111')
})


router.post('/register', async (req, res) => {
  const {username, password, type} = req.body;
  try {
    const user = await Users.findOne({username});
    if (user) {
      //用户已经存在了
      res.json({
        code: 1,
        msg: '此用户已存在'
      })
    } else {
      //可以使用的用户名
      const user = await Users.create({username, password, type});
      res.json({
        code: 0,
        data: {
          username: user.username,
          _id: user.id,
          type: user.type
        }
      })
    }
  } catch (e) {
    res.json({
      code: 2,
      msg: '网络不稳定，请刷新'
    })
  }
})
router.post('/login', async (req, res) => {
  //获取用户提交请求参数信息
  const {username, password} = req.body;
  console.log(username, password);
  
  try {
    //去数据库查找当前用户是否存在
    const user = await Users.findOne({username, password: md5(password)});
    if (user) {
      //用户可登录，登录成功
      res.json({
        code: 0,
        data: {
          _id: user.id,
          type: user.type,
          username: user.username
        }
      })
    } else {
      //用户名或密码错误
      //返回失败的响应
      res.json({
        code: 1,
        msg: '用户名或密码错误'
      })
    }
  } catch (e) {
    console.log(e);
    res.json({
      code: 2,
      msg: '网络不稳定，请刷新试试~'
    })
  }
})

module.exports = router;