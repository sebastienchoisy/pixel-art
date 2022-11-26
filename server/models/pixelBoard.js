const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcryptjs');

const PixelBoard = new Schema({
    pixelBoardname: {
        type    : String,
        trim    : true,
        required: [true, 'Board name est obligatoire']
    },
    closure: {
        type: Boolean,
        trim: true,
        default:false
    },
    nbLines: {
        type : Number,
        trim: true 
    },
    nbColumns:{
        type: Number, 
        trim: true
    }, 
    dateOfClosure:{
        type: String, 
        trim: true,
        default: null
    }, 
    author:{
        type: String, 
        trim: true,
        required: [true, 'Author est obligatoire']
    }, 
    intervalPixel:{
        type: Number,
        trim:true
    },
    multipleDrawPixel:{
        type: Boolean,
        trim:true, 
        default: true
    }


}, {
    timestamps: true 
});


module.exports = mongoose.model('PixelBoard', PixelBoard);