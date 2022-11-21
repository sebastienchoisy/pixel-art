const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcryptjs');

const PixelBoard = new Schema({
   // add info du pixelboard 
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});

// hook executé avant la sauvegarde d'un document. Hash le mot de passe quand il est modifié
PixelBoard.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    next();
});

module.exports = mongoose.model('PixelBoard', PixelBoard);