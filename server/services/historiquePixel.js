const HistoriquePixel = require('../models/historiquePixels');

//Récupération d'une dernière historique d'un utilisateur avec une board
exports.getLastHistorique = async (pixelBoardId,username) => {
    const historique = await HistoriquePixel.find({pixelBoardId: pixelBoardId,username: username});
    return historique[historique.length-1];
}