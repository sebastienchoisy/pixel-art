const express = require('express');
const { wrapAsync } = require('../lib/utils');
const HistoriquePixelService = require('../services/historiquePixel');

const router = express.Router();

//get the last pixel updated in a pixelBoard for a given user
router.get('/get', wrapAsync(async (req, res) => {
	const lastRecord = await HistoriquePixelService.getHistorique(req.body.pixelBordId,req.body.userName,res);
	if(lastRecord) {
        return res.status(200).json(lastRecord);
    }
    else {
        return res.status(501).json(error);
    }
}))

module.exports = router;
