const express = require('express');
const { wrapAsync } = require('../lib/utils');
const HistoriquePixelService = require('../services/historiquePixel');

const router = express.Router();

//get the last pixel updated in a pixelBoard for a given user
router.get('/', wrapAsync(async (req, res) => {
	const lastRecord = await HistoriquePixelService.getHistorique(req.body.pixelBordId,req.body.userName,res);
	if(lastRecord) {
        res.status(200).json(lastRecord);
    }
    else {
        res.status(501).json(error);
    }
}))

module.exports = router;
