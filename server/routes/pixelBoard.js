const express = require('express');
const { wrapAsync } = require('../lib/utils');
const PixelBoardService = require('../services/pixelBoard');
const PixelBoard = require("../models/pixelBoard");

const router = express.Router();

router.get('/get/:id', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.getPixelBoard(req,res);
	return PixelBoards;
}))

router.get('/statCount', wrapAsync(async (req,res) => {
	const PixelBoard = await PixelBoardService.countPixelBoard(req,res);
	return PixelBoard;
}));

router.patch('/update/:id', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.updatePixelBoard(req,res);
	return PixelBoards;
}));
router.patch('/updatePixel/:id', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.updatePixelOfPixelBoard(req,res);
	return PixelBoards;
}));

router.post('/add', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.createPixelBoard(req,res);
	return PixelBoards;
}));

router.delete('/delete/:id', wrapAsync(async (req, res) => {
	const PixelBoard = await PixelBoardService.deletePixelBoard(req,res);
	return PixelBoard;
}));

router.get('/all', wrapAsync(async (req, res) => {
	await PixelBoardService.getAllBoards(res);
}));

module.exports = router;
