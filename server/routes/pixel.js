const express = require('express');
const { wrapAsync } = require('../lib/utils');
const pixelService = require('../services/pixel');

const router = express.Router();

router.get('/getPixel', wrapAsync(async (req, res) => {
	const pixel = await pixelService.getPixel(req,res);
	return pixel;
}))

router.patch('/update', wrapAsync(async (req, res) => {
	const pixel = await pixelService.updatePixel(req,res);
	return pixel;
}));

router.post('/add', wrapAsync(async (req, res) => {
	const pixel = await pixelService.createPixel(req,res);
	return pixel;
}));

module.exports = router;

