const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt') //ajax sorting post in order of psoting
    .populate('user')
    .populate({
        path:'comments',
        populate :{
            path:'user'
        }
    });

    //this method below is deprecated by express
    //express deprecated res.json(status, obj): Use res.status(status).json(obj) instead

    // return res.json(200, {
    //     message: "List of posts",
    //     posts: posts
    // })

    //use this one below instead in comparison to above written method
    return res.status(200).json({
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req ,res){
    
    try{

        //finding posts in db

        let post = await Post.findById(req.params.id);
    
        //addition of if-else
        if(post.user ==  req.user.id){
            
            post.remove();
    
            await Comment.deleteMany({post:req.params.id});
    
            return res.status(200).json({
                message:"Post and comment with it deleted!",
            })
        }else{
            // req.flash('error' , 'You cant del this post!');
            // return res.redirect('back');

            return res.status(200).json({
                message: "You cant del this post!"
            });
        }
        
        
    }catch(err){
        console.log('****error',err);
        return res.json(500 , {
            message:"Internal Server Error",
        })
    }
    
}