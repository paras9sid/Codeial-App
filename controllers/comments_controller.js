const Comment = require('../models/comment');
const Post = require('../models/post');

//converting to async await

module.exports.create = async function(req,res){ 

    try{
        
        let post = await Post.findById(req.body.post) // finding post first with post id
            if(post){   // if post is found
                let comment = await Comment.create({   // action create -- created for comments
                    content: req.body.content,
                    post:req.body.post,
                    user: req.user._id
                });
                
                post.comments.push(comment);  //comment pushed to the post
                post.save();  // save tells the db thats it final version - save it
                

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment,
                        },
                        message:"Post created"
                    })

                }

                req.flash('success','Comment published!');
                res.redirect('/');
            }
        
    }catch(err){
        console.log('Error',err);
    }
}

module.exports.destory = async function(req,res){
    try{
        let comment = Comment.findById(req.params.id);
            
            if(comment.user == req.user.id){  // like done for post
    
                //fetch post id of the particular comment first
    
                let postId = comment.post;
    
                comment.remove();
    
                let post = Post.findByIdAndUpdate(postId,{ 
                    $pull: {
                         comments:req.params.id 
                        }
                    });

                    //send the comment id which was deleted back to the views
                    if(req.xhr){
                        return res.status(200).json({
                            data:{
                                comment_id:req.params.id
                            },
                            message:"Post deleted"
                        });
                    }

                    req.flash('success','Comment deleted');
                
                return res.redirect('back');
                
            }else{
                req.flash('error','Unauthorized');
                return res.redirect('back');
            }
        
        
    }catch(err){
        console.log('Error',err);
    }
}

    