const express = require('express');
const { wrapAsync } = require('../lib/utils');
const userService = require('../services/pixelBoard');

const router = express.Router();

router.get('/:id', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.getPixelBoard(req,res);
	return PixelBoards;
}))

router.patch('/update', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.updatePixelBoard(req,res);
	return PixelBoards;
}));

router.post('/add', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.createPixelBoard(req,res);
	return PixelBoards;
}));

router.delete('/delete', wrapAsync(async (req, res) => {
	const PixelBoard = await PixelBoardService.deletePixelBoard(req,res);
	return PixelBoard;// TODO : A MODIFIER
}));

module.exports = router;
