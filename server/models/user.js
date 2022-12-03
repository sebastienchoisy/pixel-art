const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose")

const User = new Schema({
    username: {
        type    : String,
        trim    : true,
        required: [true, 'Username est obligatoire']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email est obligatoire']
    },
    nbPixelModified:{
        type: Number,
        trim: true, 
        default : 0
    }, 
    pixelboardContributed:{
        type: Array,
        trim: true, 
        default:[],
        items: {
            type: "string"
        }
    },
    role:{
        type: String,
        trim: true,
        default:"user"
    }
}, {
    timestamps: true // add 2 fields auto createdAt et updatedAt
});
  
User.plugin(passportLocalMongoose) //add link to passport plugin 
module.exports = mongoose.model('User', User);