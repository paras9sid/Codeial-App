const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
    },
    //this defines the object id of the like object
    likeable:{
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //this field is used for defining th type of the like object since its dynamic reference
    onModel : {    //onModel = only model containes likes - enum post-comment
        type: String,
        required: true,
        enum:['Post','Comment']   // enum represents that like can be on either on post or comment not anyhwere else - if we remove enum it can be anywhere
    }
},{
    timestamps: true
});


const Like = mongoose.model('Like',likeSchema);
module.exports = Like;


