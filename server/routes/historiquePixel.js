const express = require('express');
const { wrapAsync } = require('../lib/utils');
const HistoriquePixelService = require('../services/historiquePixel');

const router = express.Router();

//get the last pixel updated in a pixelBoard for a given user
router.get('/get', wrapAsync(async (req, res) => {
	const PixelBoards = await HistoriquePixelService.getHistorique(req,res);
	return PixelBoards;
}))

module.exports = router;
