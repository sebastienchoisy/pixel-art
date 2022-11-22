const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcryptjs');

const User = new Schema({
    username: {
        type    : String,
        trim    : true,
        required: [true, 'User name est obligatoire']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password est obligatoire']
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
    theme:{
        type:String, 
        trim: true,
        default: "light"
    }
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});

// hook executé avant la sauvegarde d'un document. Hash le mot de passe quand il est modifié
User.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    next();
});

module.exports = mongoose.model('User', User);