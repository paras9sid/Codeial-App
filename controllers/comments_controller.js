const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){ 
    Post.findById(req.body.post,function(err,post){ // finding post first with post id
        if(post){   // if post is found
            Comment.create({   // action create -- created for comments
                content: req.body.content,
                post:req.body.post,
                user: req.user._id
            },function(err,comment){
                //handle error - post not found
                
                post.comments.push(comment);  //comment pushed to the post
                post.save();  // save tells the db thats it final version - save it

                res.redirect('/');
            });
        }
    });
}