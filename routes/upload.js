var express = require('express');
var router = express.Router();
//是nodejs中处理multipart/form-data数据格式(主要用在上传功能中)的中间件
//文档：https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
var multer = require('multer');
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  port:3306,
  password:'123456',
  database:'expressjs'
});
connection.connect();
router.get('/',(req,res)=>{
  res.render('upload');
})
router.post('/addMarker',function(req,res,next){
  var sceneId1 = req.body.sceneId1;
  var sceneId2 = req.body.sceneId2;
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;
  var markerId = sceneId1+"To"+sceneId2;
  markerId=markerId.toString();
  console.log(markerId+','+longitude+','+latitude);
  var sql = 'insert into marker values("'+markerId+'","'+longitude+'","'+latitude+'","'+sceneId1+'")';
  var _res = res;
  connection.query(sql,function(err,res,result){
    if(err)
    {
      console.log("插入数据失败！");
      _res.send({'result':'fail'});
      _res.end();
    }
    else{
      console.log("插入数据成功！");
      _res.send({'result':'succeed'});
      _res.end();
    }
  })
})
router.post('/imgToDB',function(req,res,next){
  var img_url = req.body.img_url;
  var sceneId = req.body.sceneId;
  var sql = 'select * from device_copy1';
  var _res = res;
  console.log(img_url+','+sceneId);
  var sql = 'insert into scene values("'+sceneId+'","'+img_url+'")';
  connection.query(sql,function(err,res,result){
    if(err)
    {
      console.log("插入数据失败！");
      _res.send({'result':'fail'});
      _res.end();
    }
    else{
      console.log("插入数据成功！");
      _res.send({'result':'succeed'});
      _res.end();
    }
  })
})
//配置diskStorage来控制文件存储的位置以及文件名字等
var storage = multer.diskStorage({
  //确定图片存储的位置
  destination: function (req, file, cb){
    cb(null, './public/images')
  },
  filename: function (req, file, cb){
    cb(null, file.originalname)
  }
});
//生成的专门处理上传的一个工具，可以传入storage、limits等配置
var upload = multer({storage: storage});
//接收上传图片请求的接口
router.post('/', upload.single('file'), function (req, res, next) {
  //图片已经被放入到服务器里,且req也已经被upload中间件给处理好了（加上了file等信息）
  //线上的也就是服务器中的图片的绝对地址
  var url =  req.file.filename
  res.json({
    code : 200,
    data : url
  })
});
module.exports = router;
