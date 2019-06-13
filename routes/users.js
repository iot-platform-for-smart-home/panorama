var express = require('express');
var router = express.Router();
var http =require('http');
var mysql = require('mysql');
var url = require('url')
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  port:3306,
  password:'123456',
  database:'expressjs'
});
var img_url;
var sceneId;
connection.connect();//进行数据库连接
/* GET users listing. */
router.post('/addDevice',function(req,res,next){//用于在数据库中添加设备
  var deviceId = req.body.deviceId;
  var deviceName = req.body.deviceName;
  var deviceType = req.body.deviceType;
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;
  var manufacture = req.body.manufacture;
  var model = req.body.model;
  var imageLoc1 = req.body.imageLoc1;
  var imageLoc2 = req.body.imageLoc2;
  var sceneId = req.body.sceneId;
  var typeId = req.body.typeId;
  console.log(deviceId+deviceName+deviceType+longitude+latitude+manufacture+model+imageLoc1+imageLoc2+parseInt(sceneId)+parseInt(typeId))
  var sql = 'insert into device_copy1 values("'+deviceId+'","'+deviceName+'","'+deviceType+'","'+longitude+'","'+latitude+'","'+manufacture+'","'+model+'","'+imageLoc1+'","'+imageLoc2+'","'+parseInt(sceneId)+'","'+parseInt(typeId)+'")';
  var _res=res;
  connection.query(sql,function(err,res,result){
    if(err){
      console.log("插入数据失败！");
      _res.send({'result':'fail'});
      _res.end();
    }
    else{
      console.log("插入数据成功")
      _res.send({'result':'succeed'});
      _res.end();
    }
  })
});
router.post('/getImg',function(req,res,next){//用于在数据库中获取当前场景对应的图片的URL
  var sceneId = req.body.sceneId;
  var sql = 'select * from scene';
  var _res = res;
  connection.query(sql,function(err,res,result){
    if(err){
      console.log("查询数据失败！");
      //_res.send({'result':'fail'});
      _res.end();
    }
    else{
      console.log("得到查询结果")
      var img_url;
      for(var i=0;i<res.length;i++)
      {
        console.log("正在查询中");
        if(res[i].sceneId==sceneId)
        {
          img_url=res[i].img_url;
          break;
        }
      }
      _res.send(img_url);
      _res.end();
    }
  })
})
router.post('/deleteDevice',function(req,res,next){//用于在数据库中删除设备
  var deviceId = req.body.deviceId;
  console.log("被删除设备的ID为："+deviceId);
  var sql = 'DELETE FROM device_copy1 WHERE deviceId="'+deviceId+'"';
  console.log(sql);
  var _res=res;
  connection.query(sql,function(err,res,result){
    if(err){
      console.log("删除数据失败!");
      _res.send({'result':'fail'});
      _res.end();
    }
    else{
      console.log("删除数据成功!");
      _res.send({'result':'succeed'});
      _res.end();
    }
  })
});
router.get('/loadMoveMarker',function(req,res,next){
  var sql = 'select * from marker';
  var _res=res;
  var moveMarkers = new Array();
  var moveMarker;
  connection.query(sql,function(err,res,result){
    if(err){
      console.log("查询数据失败！");
      //_res.send({'result':'fail'});
      _res.end();
    }
    else{
      console.log("得到查询结果")
      for(var i=0;i<res.length;i++)
      {
        console.log("正在查询中");
        moveMarker={markerId:res[i].markerId,longitude:res[i].longitude,latitude:res[i].latitude,sceneId:res[i].sceneId}
        console.log(moveMarker);
        moveMarkers.push(moveMarker);
      }
      _res.send(moveMarkers)
      _res.end();
    }
  })
})
router.get('/loadMarker',function(req,res,next){//用于在全景图加载完成之前，先从数据库中加载设备
  var sql = 'select * from device_copy1';
  var _res = res;
  var devices = new Array();
  var device;
  connection.query(sql,function(err,res,result){
    if(err){
      console.log("查询数据失败！");
      //_res.send({'result':'fail'});
      _res.end();
    }
    else{
      console.log("得到查询结果")
      for(var i=0;i<res.length;i++)
      {
        console.log("正在查询中");
        device={deviceId:res[i].deviceId,deviceName:res[i].deviceName,deviceType:res[i].deviceType,longitude:res[i].longitude,latitude:res[i].latitude,manufacture:res[i].manufacture,model:res[i].model,imageLoc1:res[i].imageLoc1,imageLoc2:res[i].imageLoc2,sceneId: res[i].sceneId,typeId:res[i].typeId}
        devices.push(device);
      }
      _res.send(devices)
      _res.end();
    }
  })
})
router.get('/',function(req,res,next){
  if(req.session.sign){
    //console.log(img_url+"  "+sceneId);
    return res.render('sphere2');
  }
  else{
    res.redirect('../');
  }
})
router.post('/checkInfo',function (req,res) {//用于查看设备的数据（当前主要是查看PM2.5的数据）
  var id=req.body.deviceId;
  console.log(id);
  var opt = {
    host: '47.105.120.203',
    port: 30080,
    path: '/api/v1/deviceaccess/data/alllatestdata/' + id,
    method: "GET",
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
      //"Content-Length": data.length
    }
  }
  var info="";
  http.request(opt,function(response){
    response.setEncoding('utf-8');
    response.on('data',(chunk)=>{
      info+=chunk;
    })
    response.on('end',()=>{
      info=JSON.parse(info);
      console.log(info);
      params=({"value":info[0].value.toString()})
      res.send(params);
      res.end();
    })
  }).end();
})
router.post('/checkStatus',function (req,res) {//用于查看设备当前的最新状态
  var id=req.body.deviceId;
  var deviceName = req.body.deviceName;
  console.log(id+" "+deviceName);
  var opt = {
    host: '47.105.120.203',
    port: 30080,
    path: '/api/v1/deviceaccess/data/alllatestdata/' + id,
    method: "GET",
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
      //"Content-Length": data.length
    }
  }
  var info="";
  http.request(opt,function(response){
    response.setEncoding('utf-8');
    response.on('data',(chunk)=>{
      info+=chunk;
    })
    response.on('end',()=>{
      info=JSON.parse(info);
      console.log(info);
      params=({"value":info[1].value.toString(),"deviceId":id})
      res.send(params);
      res.end();
    })
  }).end();
})

router.post('/check',function(req,res){//用于获取设备的属性
  var id=req.body.deviceId;
  var type = req.body.type;
  var manufacture = req.body.manufacture;
  var model = req.body.model;
  console.log("id:"+id+" type:"+type+" manufacture:"+manufacture+" model:"+model);
  var opt = {
    host:'47.105.120.203',
    port:30080,
    path:'/api/v1/deviceaccess/allattributes/'+id,
    method:"GET",
    headers:{
      "Content-Type": 'application/json;charset=UTF-8',
      //"Content-Length": data.length
    }
  }
  var content='';
  var reqq = http.request(opt,async (response)=>{

    response.setEncoding('utf-8');
    response.on('data',(chunk)=>{
      content+=chunk;
    });
    response.on('end',()=>{
      //console.log(content);
      content =  JSON.parse(content);
      opt.path='/api/v1/servicemanagement/ability/'+manufacture+'/'+type+'/'+model;
      http.request(opt,function (response) {//进一步获取设备能够操作的服务
        console.log(opt);
        var service="";
        response.setEncoding('utf-8');
        response.on('data',(chunk)=>{
          service+=chunk;
        });
        response.on('end',()=>{
          service = JSON.parse(service);
          service = JSON.parse(service[0].abilityDes);
          console.log(service);
          var serviceName = service.serviceName.toString();
          var methodName = service.serviceBody.methodName.toString();
          service = service.serviceBody.params;
          var statusType = service[2].type.toString();
          var statusValue = service[2].value.toString();
          var params=({"Endpoint":content[0].value.toString(),"shortAddress":content[7].value.toString(),"serviceName":serviceName,"methodName":methodName,"statusType":statusType,"statusValue":statusValue})
          console.log(params);
          res.send(params);
          res.end();
        })
      }).end();
      //console.log(content);

    })
  }).end()

  reqq.on('error',function(error){
    console.log(error.toString())
  })

})
router.post('/control',function(req,res){//用于对设备进行控制
  var deviceId=req.body.deviceId;
  var value = req.body.value.toString();
  var requestId=req.body.requestId;
  var post_data={
    serviceName:req.body.serviceName ,
    methodName: req.body.methodName,
    shortAddress: req.body.shortAddress,
    Endpoint: req.body.Endpoint,
    status: req.body.statusValue,
  }
  if(value=="true")
  {
    var content=JSON.stringify(post_data);
    console.log(content)
    var opt = {
      host: '47.105.120.203',
      port: 30080,
      path: '/api/v1/deviceaccess/rpc/' + deviceId+'/'+requestId,
      method: "POST",
      headers: {
        "Content-Type": 'application/json;charset=UTF-8',
        "Content-Length": content.length
      }
    }
    var reqq = http.request(opt,function(response) {
      //response.on('end', function () {
        setTimeout(function () {
          console.log("进来了！！！")
          var status;
          var opt = {
            host: '47.105.120.203',
            port: 30080,
            path: '/api/v1/deviceaccess/data/alllatestdata/' + deviceId,
            method: "GET",
            headers: {
              "Content-Type": 'application/json;charset=UTF-8',
              //"Content-Length": data.length
            }
          }
          var check = http.request(opt, function (response) {
            var checkResult = "";
            response.setEncoding('utf-8');
            response.on('data', (chunk) => {
              checkResult += chunk;
            });
            response.on('end', () => {
              checkResult = JSON.parse(checkResult);
              console.log(checkResult);
              status = checkResult[1].value;
              if (status) {
                res.send({'result': ("true").toString()});
              } else {
                res.send({'result': ("false").toString()})
              }
            })
          });
          check.on('error', function (error) {
            console.log(error.toString())
          });
          check.end();
        },1500)

      //});
    })
    reqq.write(content);
    reqq.end();
  }
  else
  {
    content=JSON.stringify(post_data);//注意parse和stringify的区别
    opt = {
      host: '47.105.120.203',
      port: 30080,
      path: '/api/v1/deviceaccess/rpc/' + deviceId+'/'+requestId,
      method: "POST",
      headers: {
        "Content-Type": 'application/json;charset=UTF-8',
        "Content-Length": content.length
      }
    }
    console.log(content);
    var reqq = http.request(opt,function(response) {
      //response.on('end', function () {
      setTimeout(function () {
        console.log("进来了！！！")
        var status;
        var opt = {
          host: '47.105.120.203',
          port: 30080,
          path: '/api/v1/deviceaccess/data/alllatestdata/' + deviceId,
          method: "GET",
          headers: {
            "Content-Type": 'application/json;charset=UTF-8',
            //"Content-Length": data.length
          }
        }
        var checkResult = "";
        var check = http.request(opt, function (response) {
          response.setEncoding('utf-8');
          response.on('data', (chunk) => {
            checkResult += chunk;
          });
          response.on('end', () => {
            //console.log(content);
            checkResult = JSON.parse(checkResult);
            console.log(checkResult);
            status = checkResult[1].value;
            if (!status) {
              res.send({'result': "true"});
            } else {
              res.send({'result': "false"})
            }
          })
        });
        check.on('error', function (error) {
          console.log(error.toString())
        });
        check.end();
      },1500)

      //})
    })
    reqq.write(content);
    reqq.end();
  }
})
module.exports = router;
