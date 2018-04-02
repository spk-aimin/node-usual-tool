var express = require('express');
var router = express.Router();
var hbs  = require("hbs");

/* GET home page. */
router.get('/', (req, res, next) =>{
    console.log(req.params);
    console.log(req.query);
    hbs.registerHelper("hello", function (a, b) {
        return a+" "+b;
    });
    res.render('index', { title: '测试标题',layout: 'layout2' ,a: "hello", b: "world"});
}).post('/', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","*");
    console.log(req.body);
    res.render('index', { title: '测试标题', a: "hello", b: "world"});
});

module.exports = router;
