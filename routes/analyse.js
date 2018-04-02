/**文件解析 */
var express = require('express');
var multer = require('multer');
var fs = require("fs");
var xlsx = require("node-xlsx");
var router = express.Router();
var storage = multer.diskStorage({
    destination:  './tmp/uploads',
    filename: function (req, file, cb) {
      cb(null, Date.now()+"-"+file.originalname);
    }
})
let upload = multer({storage: storage});

/* GET home page. */
router.get('', (req, res, next) =>{
    console.log(req.params);
    console.log(req.query);
    res.render('analyse/index', { title: '文件解析',layout: 'layout'});
}).post('/profession1',upload.fields([{name: "file"}]), function (req, res, next) {
    try {
        var file =req.files.file[0], path = file.path, sendData = [],
            xlsxData = xlsx.parse(path),
            xh1 = xlsxData[0].data,
            filename = file.originalname.split(".");
        filename.pop();
        filename = filename.join(".");
        for(var item of xh1) {
            if(item[0]) {
                sendData.push({
                    des: item[0],
                    val: item[1],
                    code: item[2]
                })
            }
        }

        res.setHeader('Content-disposition', 'attachment; filename='+filename+'.json');
        res.setHeader('Content-type',"application/octet-stream");
        if(sendData) {
            res.write(JSON.stringify(sendData));
        } else {
            res.write("请检查您的文件");
        }
  
        res.end();
    } catch(e) {
        var err = new Error('500');
        err.status = 500;
        next(err);
        console.log(e);
    }finally {
        //删除缓存中的文件
        for(var item of req.files.file) {
            fs.unlinkSync(item.path);
        }
    }
    //res.render('index', { title: '测试标题', a: "hello", b: "world"});
}).post("/profession2",upload.fields([{name: "file"}]), function(req, res, next) {
    try {
        var file =req.files.file[0], path = file.path, sendData = [], p = {children: []}, c = {},
            xlsxData = xlsx.parse(path),
            xh1 = xlsxData[0].data,
            filename = file.originalname.split(".");
        filename.pop();
        filename = filename.join(".");
        for(var i=0; i< xh1.length; i++) {
            var item = xh1[i], next = xh1[i+1];
            if(p.des != item[0] && item[0]) {
                p= {
                    des: item[0],
                    children: [{
                        des: item[1],
                        val: item[2],
                        code: item[3]
                    }]
                }
            } else {
                if(item[1]) {
                    p.children.push({
                        des: item[1],
                        val: item[2],
                        code: item[3]
                    });
                }
            }
            if(next) {
                if(next[0] && (next[0] != p.des)) {
                    sendData.push(p);
                }
            } else {
                sendData.push(p);
            }
        }
        res.setHeader('Content-disposition', 'attachment; filename='+filename+'.json');
        res.setHeader('Content-type',"application/octet-stream");
        if(sendData) {
            res.write(JSON.stringify(sendData));
        } else {
            res.write("请检查您的文件");
        }
        res.end();
    } catch(e) {
        var err = new Error('500');
        err.status = 500;
        next(err);
        console.log(e);
    } finally {
        //删除缓存中的文件
        for(var item of req.files.file) {
            fs.unlinkSync(item.path);
        }
    }

}).post("/profession3", function(req, res, next) {
    
})

module.exports = router;
