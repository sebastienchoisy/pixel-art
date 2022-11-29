const HistoriquePixel = require('../models/historiquePixels');

exports.getHistorique = async (pixelBoardId,username) => {
    const historique = await HistoriquePixel.find({pixelBoardId: pixelBoardId,username:  username })
    return historique[historique.length-1]     
}