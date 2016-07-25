/**
 * Created by Lincoln on 2016/7/17.
 */
var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res, next){
    res.send('logout');
});
router.get('/logout', function(req, res){
    req.session.user = null;
    res.render('success', 'µÇ³ö³É¹¦');
    res.redirect('/');
});

module.exports = router;