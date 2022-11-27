const HistoriquePixel = require('../models/historiquePixels');

exports.getHistorique = async (req,res) => {
    const historique = await HistoriquePixel.find({pixelBordId: req.body.pixelBordId,userName:  req.body.userName })
    const lastRecord = historique[historique.length-1]     
    if(lastRecord) {
        return res.status(200).json(lastRecord);
    }
    else {
        return res.status(501).json(error);
    }
}