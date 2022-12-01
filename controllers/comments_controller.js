const Comment = require('../models/comment');
const Post = require('../models/post');

// module.exports.create = function(req,res){ 
//     Post.findById(req.body.post,function(err,post){ // finding post first with post id
//         if(post){   // if post is found
//             Comment.create({   // action create -- created for comments
//                 content: req.body.content,
//                 post:req.body.post,
//                 user: req.user._id
//             },function(err,comment){
//                 //handle error - post not found
//                 if(err){console.log(err);}
//                 post.comments.push(comment);  //comment pushed to the post
//                 post.save();  // save tells the db thats it final version - save it

//                 res.redirect('/');
//             });
//         }
//     });
// }

// module.exports.destory = function(req,res){
    
//     Comment.findById(req.params.id,function(err,comment){
        
//         if(comment.user == req.user.id){  // like done for post

//             //fetch post id of the particular comment first

//             let postId = comment.post;

//             comment.remove();

//             Post.findByIdAndUpdate(postId,{ $pull: { comments:req.params.id }},function(err,post){
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     });
// }


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
                
                return res.redirect('back');
                
            }else{
                return res.redirect('back');
            }
        
        
    }catch(err){
        console.log('Error',err);
    }
}

    