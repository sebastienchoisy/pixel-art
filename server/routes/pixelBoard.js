const express = require('express');
const { wrapAsync } = require('../lib/utils');
const PixelBoardService = require('../services/pixelBoard');
const PixelBoard = require("../models/pixelBoard");

const router = express.Router();

router.get('/:id', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.getPixelBoard(req,res);
	return PixelBoards;
}))

router.get('/statCount', wrapAsync(async (req,res) => {
	const PixelBoard = await PixelBoardService.countPixelBoard(req,res);
	return PixelBoard;
}));

// a ajouter dans postman

router.get('/populars', wrapAsync(async (req,res) => {
    await PixelBoardService.getPopularBoards(res);
}));

router.get('/lastcreated', wrapAsync(async (req,res) => {
    await PixelBoardService.getRecentsBoards(res);
}));

router.get('/', wrapAsync(async (req,res) => {
    await PixelBoardService.getBoards(res);
}));

router.get('/lastclosed', wrapAsync(async (req,res) => {
    await PixelBoardService.getLastClosedBoards(res);
}))

// a ajouter

// TODO : ajouter les stratégies de log dans les routes 
// TODO : changer tous les id et les mettre dans body PARTOUT

router.patch('/:id', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.updatePixelBoard(req,res);
	return PixelBoards;
}));
router.patch('/:id/pixel', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.updatePixelOfPixelBoard(req,res);
	return PixelBoards;
}));

router.post('/', wrapAsync(async (req, res) => {
	const PixelBoards = await PixelBoardService.createPixelBoard(req,res);
	return PixelBoards;
}));

router.delete('/:id', wrapAsync(async (req, res) => {
	const PixelBoard = await PixelBoardService.deletePixelBoard(req,res);
	return PixelBoard;
}));

router.get('/all', wrapAsync(async (req, res) => {
	await PixelBoardService.getAllBoards(res);
}));

module.exports = router;
