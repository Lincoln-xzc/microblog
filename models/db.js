/**
 * Created by Lincoln on 2016/7/17.
 */
var settings = require('../setting');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, '27017', {}) );
