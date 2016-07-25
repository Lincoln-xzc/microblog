/**
 * Created by Lincoln on 2016/7/17.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');

router.get('/reg', function(req, res, next){
    res.render('reg',{title:'reg'});
});

router.post('/reg', checkLogin);
router.post('/reg', function(req, res, next){
    console.log(req.body['username']);
    //�����û���������Ŀ����Ƿ�һ��
    if(req.body['password-repeat'] != req.body['password']){
        console.log('两次输入的密码不一样');
        return res.redirect('/api/reg');
    }

    //���������ɢ��ֵ
    var md5 = crypto.createHash('md5'); //crypto��һ����һ�����ܲ����ɸ���ɢ��ֵ
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: req.body.password
    });

    //����û����Ƿ����
    User.get(newUser.name, function(err, user){
        if(user){
            console.log( 'username already exits');
            return res.redirect('/api/reg');
        }

        //����û��������������û�
        newUser.save(function(err){
            if(err){
               // req.flash('error', err); //req.flash��express�ṩ��һ������ߣ�ͨ��������ı���ֻ���ڵ�ǰ�û�����һ�ε������б�����
                return res.redirect('/api/reg');
            }
            req.session.user = newUser;
            //req.flash('success', 'ע��ɹ�');
            res.redirect('/index');
        })
    })
});
function checkLogin(req,res, next){
    if(!req.session.user){
        console.log('未登入');
        return res.redirect('/api/login');
    }
    next();
}
function checkNotLogin (req, res, next){
    if(req.session.user){
        console.log('已成功');
        return res.redirect('/')
    }
    next();
}
module.exports = router;