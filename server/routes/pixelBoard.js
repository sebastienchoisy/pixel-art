const express = require('express');
const { wrapAsync } = require('../lib/utils');
const PixelBoardService = require('../services/pixelBoard');

const router = express.Router();

router.use((req, res, next) => {
	// eslint-disable-next-line no-console
	console.log(`PixelBoard API - ${req.method} request for ${req.url}`);
	next();
});

router.get('/',
	wrapAsync(async (req, res) => {
		try {
			const PixelBoards = await PixelBoardService.getPixelBoard();
			return res.json(PixelBoards);// TODO : A MODIFIER
		} catch (err) {
			return res.status(500).json({ error: err.message });// TODO : A MODIFIER
		}
	}));

router.post('/', wrapAsync(async (req, res) => {
	const PixelBoard = req.body;
	await PixelBoardService.createPixelBoard(PixelBoard);
	return res.json(PixelBoard);// TODO : A MODIFIER
}));

router.post('/', wrapAsync(async (req, res) => {
	const PixelBoard = req.body;
	await PixelBoardService.updatePixelBoard(PixelBoard);
	return res.json(PixelBoard);// TODO : A MODIFIER
}));

router.delete('/', wrapAsync(async (req, res) => {
	const PixelBoard = req.body;
	await PixelBoardService.deletePixelBoard(PixelBoard);
	return res.json(PixelBoard);// TODO : A MODIFIER
}));

module.exports = router;
