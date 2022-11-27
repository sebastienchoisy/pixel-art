const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const HistoriquePixel = new Schema({
    pixelBordId: {
        type    : String,
        trim    : true,
        required: [true, 'pixelBordId est obligatoire']
    },
    userName: {
        type: String,
        trim: true,
        required: [true, 'userName est obligatoire']
    },
    dateUpdate:{
        type:String, 
        trim:true,
        required: [true, 'dateUpdate est obligatoire']
    }
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});



module.exports = mongoose.model('HistoriquePixel', HistoriquePixel);