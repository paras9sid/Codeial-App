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

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req ,res){
    
    try{

        //finding posts in db

        let post = await Post.findById(req.params.id);
    
     
        post.remove();

        await Comment.deleteMany({post:req.params.id});

        return res.json(200, {
            message:"Post and comment with it deleted!",
        })
        
        
    }catch(err){
        console.log('****error',err);
        return res.json(500 , {
            message:"Internal Server Error",
        })
    }
    
}