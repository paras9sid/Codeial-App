const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req, res){

    //handling erros with try catch
    
    try{

        //another way to write above function with more details we need to display on browser
        // populate the user of each post & query will return all the posts
    
        let posts = await Post.find({})
        .sort('-createdAt') //ajax sorting post in order of psoting
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path:'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');
        
                
        //find all the users
        let users = await User.find({})

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });
        
    }catch(err){
        console.log('Error',err);
        return;
    }
    
}