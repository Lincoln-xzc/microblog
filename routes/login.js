/**
 * Created by Lincoln on 2016/7/17.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/login',function(req, res, next){
    res.render('login',{'title':'登录'});
});

router.post('/login', function(req, res, next){
    User.get(req.body.username, function(err, user){
        if(!user){
            console.log('用户不存在');
            return res.redirect('/api/login');
        }
        console.log(user);
        if(user.password != req.body.password){
          console.log('密码不正确');
            return res.redirect('/api/login');
        }
        req.session.user = user;
        console.log('登录成功');
        return res.redirect('/index');


    });
});

module.exports = router;