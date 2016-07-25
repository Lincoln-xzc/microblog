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
    //����mongodb���ĵ�
    var post = {
        user: this.user,
        post: this.post,
        time: this.time
    };
    mongod.open(function(err, db){
        if(err){
            return callback(err);
        }

        //��ȡposts����
        db.collection('posts', function(err, collection){
            if(err){
                mongod.close();
                return callback(err);
            }
            //Ϊuser�����������
            collection.ensureIndex('user');
            //д��post�ĵ�
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
        //��ȡpost����
        db.collection('posts', function(err, collection){
            if(err){
                mongod.close();
                return callback(err);
            }
            //����userΪusername���ĵ������username��null��ƥ��ȫ��
            var query = {};
            if(username){
                query.user = username;
            }
            collection.find(query).toArray(function(err,docs){
                mongod.close();
                if(err){
                    callback(err, null);
                }
                //��װpostsΪpost����
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