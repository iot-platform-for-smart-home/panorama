var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  port:3306,
  password:'123456',
  database:'expressjs'
});
connection.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.sign){//如果用户已经登陆，则不显示登陆界面
    console.log('用户已登录！！');
    res.redirect('/users');
  }
  else {//如果用户未登录，则进入登陆界面
    console.log('您还没登陆！');
    res.render('login');
 }

});
router.get('/out',function(req,res){
  req.session.destroy();
  res.redirect('/api/v1/sphere');
})
router.post('/login',function(req,res){
  var name = req.body.name;
  var password = req.body.code;
  var sql = "select * from user_copy1 ";
  var _res=res;
  connection.query(sql,function(err,res,result){
    if(err){
      console.log("查询数据失败！");
      _res.send({'result':'fail'});
      _res.end();
    }
    else{
      console.log("得到查询结果")
      var isTrue=false;
      for(var i=0;i<res.length;i++)
      {
        console.log("正在查询中");
        if(res[i].username == name && res[i].pass_word == password)
        {
          isTrue=true;
          break;
        }
      }
      if(isTrue)
      {
        console.log('查询成功！');
        req.session.sign=true;
        var sql = "select * from scene";
        connection.query(sql,function(err,res,result){
          var isGot=false;
          var loc;
          for(var i=0;i<res.length;i++)
          {
            if(res[i].sceneId==1)
            {
              isGot=true;
              loc=i;
              break;
            }
          }
          if(isGot)
          {
            _res.send({'result':res[loc].img_url});
            _res.end();
          }
          else{
            _res.send({'result':'nothave'});
            _res.end();
          }
          
        })
        
      }
      else
      {
        console.log("查无此用户！");
        _res.send({'result':'fail'});
        _res.end();
      }
    }
  })
})
router.post('/reg',function(req,res){
  var name = req.body.name;
  var password = req.body.code;
  var sql = 'insert into user_copy1(username,pass_word) values("'+name+'","'+password+'")';
  connection.query(sql,function(err,result){
    if(err){
      console.log("插入数据失败！");
      res.send({'result':'fail'});
      res.end();
      //onnection.release();
    }
    else{
      console.log('插入数据成功！');
      res.send({'result':'succeed'});
      res.end();
      //connection.release();
    }
  })


})
router.get('/register',function(req,res,next){
  return res.render('registerPage');
});

module.exports = router;
