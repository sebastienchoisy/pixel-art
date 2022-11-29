const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const HistoriquePixel = new Schema({
    pixelBoardId: {
        type    : String,
        trim    : true,
        required: [true, 'pixelBordId est obligatoire']
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'userName est obligatoire']
    }
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});



module.exports = mongoose.model('HistoriquePixel', HistoriquePixel);