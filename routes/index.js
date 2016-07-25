var express = require('express');
var router = express.Router();

var data = {
  'name':'xzsdfc',
  'tel' : 'bbb'
};
/*router.get('/user/:username', function(req, res){
  res.send(req.params.username);
});*/

/*router.all('/user/:username', function(req, res, next){
  if(req.params.username == data.name)
    res.send(req.params.username)
  else
    next();
});*/

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.get('/hello', function(req, res){
  //res.send('this new date'+ new Date().toString());
  res.json(data);
});*/




module.exports = router;
