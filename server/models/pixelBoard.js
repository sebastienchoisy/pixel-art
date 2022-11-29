const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Pixel = require('./pixel');

const PixelBoard = new Schema({
    pixelBoardname: {
        type    : String,
        trim    : true,
        required: [true, 'Board name est obligatoire']
    },
    isClosed: {
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
        default: null,
        format: Date
    }, 
    author:{
        type: String, 
        trim: true,
        required: [true, 'Author est obligatoire']
    }, 
    intervalPixel:{
        type: Number,
        trim:true,
        default: 0
    },
    multipleDrawPixel:{
        type: Boolean,
        trim:true, 
        default: true
    }, 
    pixels: {
        type: [Pixel.schema],
        default: []
    }
}, {
    timestamps: true 
});


module.exports = mongoose.model('PixelBoard', PixelBoard);