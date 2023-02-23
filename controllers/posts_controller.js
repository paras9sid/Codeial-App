const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

// converting into async await - delete callback functions after converting tinto async await

module.exports.create = async function(req,res){

    try{
        let post = await Post.create({ // action create -- created -- mapped to routes - post.js
            content: req.body.content, // content = name of textarea name(home.ejs file) like input tag box --
            user : req.user._id   
        });

        //ajax request add
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                },
                message:"Post created!"
            })
        }
        
        req.flash('success','Post published!');
        return res.redirect('back');
    
    }catch(err){
        // console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');

    }
}

//action for deleting post

module.exports.destroy = async function(req ,res){
    
    try{

        //finding posts in db

        let post = await Post.findById(req.params.id);
    
            //post found
            //.id = conveting the object id into string -> _id converted to .id by mongoose implicitily
    
            if(post.user == req.user.id){  //

                // CHANGE :: delete the associated likes for the post and all its comments likes too
                await Like.deleteMany({ likeable: post, onModel: 'POST' });
                await Like.deleteMany({ _id: {$in: post.comments} });


                post.remove();
    
                await Comment.deleteMany({post:req.params.id});

                //deleting post ajax request xhr
                if(req.hxr){
                    return res.status(200).json({
                        data: {
                            post_id : req.params.id
                        },
                        message: "Post deleted successfully!"
                    });
                }

                req.flash('success','Post and comments deleted!');

                return res.redirect('back');
            }else{
                req.flash('error','You can not deleted the psot');
                return res.redirect('back');
            }
        
        
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}