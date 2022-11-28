const HistoriquePixel = require('../models/historiquePixels');

exports.getHistorique = async (pixelBordId,userName,res) => {
    const historique = await HistoriquePixel.find({pixelBordId: pixelBordId,userName:  userName })
    return historique[historique.length-1]     
}