/**
 * Created by Administrator on 2018/12/3.
 */
const express = require('express');

const router = new express.Router();
router.get('/', (req, res) => {
  res.send('来自服务器的响应111')
})
module.exports = router;