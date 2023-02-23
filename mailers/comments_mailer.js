// comments related mails

//import nodemailer from '../config/nodemailer';//
const nodeMailer = require('../config/nodemailer');
require('dotenv').config();



//this is another way of exporting a method - using arow functions
exports.newComment = (comment) => {
    // console.log('inside newComment mailer',comment);

    //after creating ejs file - new_comment.ejs
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs'); //in nodemailer.js - views mailers chek for relative path


    nodeMailer.transporter.sendMail({
        // from : '@gmail.com',
        from: process.env.EMAIL_TO_USE, //dotenv config
        to : comment.user.email,
        subject : 'new comment published',
        // body:'<h1>you,your comment is published</h1>',
        //will pass htmlString
        html : htmlString

    },
    //callback function 
    (err,info) => {
        if(err){
            console.log('error sending mail ' , err);
            return;
        }

        console.log('Message sent',info);
        return;
    });
}