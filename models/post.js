/**
 * Created by Lincoln on 2016/7/18.
 */
var mongod = require('./db');

function Post(username, post, time){
    this.user = username;
    this.post = post;
    if(time){
        this.time = time;
    } else {
        this.time = new Date();
    }
};
module.exports = Post;

Post.prototype.save = function save(callback){
    //存入mongodb的文档
    var post = {
        user: this.user,
        post: this.post,
        time: this.time
    };
    mongod.open(function(err, db){
        if(err){
            return callback(err);
        }

        //读取posts集合
        db.collection('posts', function(err, collection){
            if(err){
                mongod.close();
                return callback(err);
            }
            //为user属性添加索引
            collection.ensureIndex('user');
            //写入post文档
            collection.insert(post, {safe: true}, function(err, post){
                mongod.close();
                callback(err, post);
            });
        });
    });
};
Post.get = function get(username, callback){
    mongod.open(function(err, db){
        if(err){
            return callback(err);
        }
        //读取post集合
        db.collection('posts', function(err, collection){
            if(err){
                mongod.close();
                return callback(err);
            }
            //查找user为username的文档，如果username是null则匹配全部
            var query = {};
            if(username){
                query.user = username;
            }
            collection.find(query).toArray(function(err,docs){
                mongod.close();
                if(err){
                    callback(err, null);
                }
                //封装posts为post对象
                var posts = [];
                docs.forEach(function(doc, index){
                    var post = new Post(doc.user, doc.post, doc.time);
                    posts.push(post);
                });
                callback(null, posts);
            })
        })
    })
}