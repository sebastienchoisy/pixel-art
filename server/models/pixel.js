const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Pixel = new Schema({
    posX: {
        type    : Number,
        trim    : true,
        required: [true, 'Position X est obligatoire']
    },
    posY: {
        type: Number,
        trim: true,
        required: [true, 'Position Y est obligatoire']
    },
    pixelboardAssociated:{
        type: String,//id 
        trim: true,
        required:[true, 'PixelBoard associe est obligatoire']
    }, 
    color:{
        type:String, 
        trim:true,
        required: [true, 'Color est obligatoire']
    }, 
    occurence:{
        type: Number, 
        trim:true,
        default:0
    }, 
    lastUpdateUser:{
        type: String,
        trim:true ,
        default: null
    }
   
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});



module.exports = mongoose.model('Pixel', Pixel);