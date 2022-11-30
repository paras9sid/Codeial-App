// const Post = require('../models/post');

// module.exports.home = function(req,res){
//     // return res.end('<h1>Express is up for codeial</h1>');
//     // console.log(req.cookies);// will print cookies written in inpect--application -storage --cokies
//     // res.cookie('',18); // explicity cookie value changed -- will reflect in inspect-applciation-cookie
//     // return res.render('home',{
//     //     title:"Home"
//     // });

//     // posts/comment in db
   
//     // Post.find({},function(err,posts){
//     //     return res.render('home',{
//     //         title:"Codeial | Home",
//     //         posts
//     //     });
//     // });

//      //populating db (populate the user of each post) - google search -- mongoose populate
//      Post.find({}).populate('user').exec(function(err,posts){
//         return res.render('home',{
//             title:"Codeial | Home",
//             posts
//         });
//      });

// };

const Post = require('../models/post');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    // .populate({
    //     path:'comments',
    //     populate :{
    //         path:'user'
    //     }
    // })
    .exec(function(err, posts){
        // if (err) {return handleError(err);}

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })

}

// module.exports.actionName = function(req, res){}