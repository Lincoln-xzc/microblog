/**
 * Created by Lincoln on 2016/7/17.
 */
var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');

router.get('/post', function(req, res, next){
    res.render('post',{'title':'����'});
});

router.post('/post',function(req, res){
    var currentUser = req.session.user;
    console.log(currentUser);
    var post = new Post(currentUser.name, req.body.post);
    post.save(function(err){
        if(err){
            console.log('error',err);
            return res.redirect('/api/post');
        }
        console.log('success', '成功');
        res.redirect('/api/u/'+currentUser.name);
    })
});
router.get('/u/:user', function(req, res){
    User.get(req.params.user, function(err,user){
        if(!user){
            console.log('error', '错误');
            return res.redirect('/index');
        }
        console.log(user);
        Post.get(user.name, function(err, posts){
            if(err){
                console.log(posts);
                console.log('error', err);
                return res.redirect('/api/post');
            }
            res.json({user: user, posts: posts})
        });
    });
});

module.exports = router;