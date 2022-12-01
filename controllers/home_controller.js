const Post = require('../models/post');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    //query will return all the posts

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts   // will show these posts in home.ejs VIEW
    //     });
    // });

    //another way to write above function with more details we need to display on browser
    // populate the user of each post & query will return all the posts

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate :{
            path:'user'
        }
    })
    .exec(function(err, posts){
        if (err) {console.log(err);}

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })

}

// module.exports.actionName = function(req, res){}