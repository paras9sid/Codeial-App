// comments related mails

//import nodemailer from '../config/nodemailer';//
const nodemailer = require('../config/nodemailer');


//this is another way of exporting a method - using arow functions
exports.newComment = (comment) => {
    console.log('inside newComment mailer',comment);

    nodemailer.transporter.sendMail({
        from : '@gmail.com',
        to : comment.user.email,
        subject : 'new comment published',
        body:'<h1>you,your comment is published</h1>',

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