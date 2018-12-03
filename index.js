/**
 * Created by Administrator on 2018/12/3.
 */
const express = require('express');
const app = express();
const router = require('./router');
const db = require('./db');
(async () => {
  await db;
  app.use(router);
});

app.listen(4000, err => {
  if(!err) console.log(('服务器启动完成(请访问-   http://localhost:4000 )'));
  else console.log(err);
})