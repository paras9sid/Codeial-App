// const Comment = require('../models/comment');
// const Post = require('../models/post');
// const commentsMailer = require('../mailers/comments_mailer');
// // import {commentsMailer} from '../mailers/comments_mailer';
// //converting to async await

// module.exports.create = async function(req,res){ 

//     try{
        
//         let post = await Post.findById(req.body.post) // finding post first with post id
//             if(post){   // if post is found
//                 let comment = await Comment.create({   // action create -- created for comments
//                     content: req.body.content,
//                     post:req.body.post,
//                     user: req.user._id
//                 });
                
//                 post.comments.push(comment);  //comment pushed to the post
//                 post.save();  // save tells the db thats it final version - save it
                
//                 //populate user everytime
//                 comment = await comment.populate('user', 'name email').execPopulate();
//                 commentsMailer.newComment(comment);

//                 // if(req.xhr){
//                 //     //similar for comments to fetch the user's id
//                 //     //populate user if req == xhr only
//                 //     //comment = await comment.populate('user','name').execPopulation();

//                 //     return res.status(200).json({
//                 //         data:{
//                 //             comment,
//                 //         },
//                 //         message:"Post created"
//                 //     })

//                 // }

//                 req.flash('success','Comment published!');
//                 res.redirect('/');
//             }
        
//     }catch(err){
//         console.log('Error',err);
//     }
// }

// module.exports.destory = async function(req,res){
//     try{
//         let comment = Comment.findById(req.params.id);
            
//             if(comment.user == req.user.id){  // like done for post
    
//                 //fetch post id of the particular comment first
    
//                 let postId = comment.post;
    
//                 comment.remove();
    
//                 let post = Post.findByIdAndUpdate(postId,{ 
//                     $pull: {
//                          comments:req.params.id 
//                         }
//                     });

//                     // //send the comment id which was deleted back to the views
//                     // if(req.xhr){
//                     //     return res.status(200).json({
//                     //         data:{
//                     //             comment_id:req.params.id
//                     //         },
//                     //         message:"Post deleted"
//                     //     });
//                     // }

//                     req.flash('success','Comment deleted');
                
//                 return res.redirect('back');
                
//             }else{
//                 req.flash('error','Unauthorized');
//                 return res.redirect('back');
//             }
        
        
//     }catch(err){
//         console.log('Error',err);
//     }
// }

    

const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user', 'name email');
            // const newComment=comment.findByID(comment._id).populate('user');
            commentsMailer.newComment(comment);
            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}