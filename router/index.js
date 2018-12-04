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


module.exports = router;