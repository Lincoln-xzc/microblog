/**
 * Created by Lincoln on 2016/7/17.
 */
var mongodb = require('./db');

function User(user){
    this.name = user.name;
    this.password = user.password;
};
module.exports = User;

User.prototype.save = function save(callback){
    //����mongodb���ĵ�
    var user = {
        name: this.name,
        password: this.password
    };
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //��ȡuser����
         db.collection('users', function(err, collection){
             if(err){
                 mongodb.close();
                 return callback(err);
             }
             //Ϊname�����������
             collection.ensureIndex('name', {unique: true});
             //д��user�ĵ�
             collection.insert(user, {safe: true}, function(err, user){
                 mongodb.close();
                 callback(err, user);
             });
         });
    });
};

User.get = function get(username, callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //��ȡusers����
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //����name����Ϊusername���ĵ�
            collection.findOne({name: username}, function(err,doc){
                mongodb.close();
                if(doc){
                    var user = new User(doc);
                    callback(err, user);
                } else{
                    callback(err, null);
                }
            });
        });
    });
};