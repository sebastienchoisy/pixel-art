const express = require('express');
const { wrapAsync } = require('../lib/utils');
const PixelBoardService = require('../services/pixelBoard');
const passport = require("passport")
const PixelBoard = require("../models/pixelBoard");

const router = express.Router();

router.get('/', wrapAsync(async (req, res) => {
	if(req.query.id) {
		await PixelBoardService.getPixelBoard(req,res);
	}
	else {
		await PixelBoardService.getBoards(res);
	}
}))

router.get('/statCount', wrapAsync(async (req,res) => {
	await PixelBoardService.countPixelBoard(req,res);
}));

router.get('/populars', wrapAsync(async (req,res) => {
    await PixelBoardService.getPopularBoards(res);
}));

router.get('/lastcreated', wrapAsync(async (req,res) => {
    await PixelBoardService.getRecentsBoards(res);
}));

router.get('/lastclosed', wrapAsync(async (req,res) => {
    await PixelBoardService.getLastClosedBoards(res);
}))

router.patch('/', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await PixelBoardService.updatePixelBoard(req,res);
}));

router.patch('/pixel', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await PixelBoardService.updatePixelOfPixelBoard(req,res);
}));

router.post('/', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await PixelBoardService.createPixelBoard(req,res);
}));

router.delete('/', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await PixelBoardService.deletePixelBoard(req,res);
}));

module.exports = router;
