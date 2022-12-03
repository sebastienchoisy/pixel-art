const express = require('express');
const { wrapAsync } = require('../lib/utils');
const PixelBoardService = require('../services/pixelBoard');
const passport = require("passport")
const userService = require("../services/user");

const router = express.Router();

// Renvoi d'une board si id en query sinon toutes les boards
router.get('/', wrapAsync(async (req, res) => {
	if(req.query.id) {
		await PixelBoardService.getPixelBoard(req,res);
	}
	else {
		await PixelBoardService.getBoards(res);
	}
}))

// Renvoi du nombre total de boards
router.get('/count', wrapAsync(async (req,res) => {
	await PixelBoardService.countPixelBoard(req,res);
}));

// Renvoi des 5 boards les plus populaires
router.get('/populars', wrapAsync(async (req,res) => {
    await PixelBoardService.getPopularBoards(res);
}));

// Renvoi des 5 boards les plus récentes
router.get('/lastcreated', wrapAsync(async (req,res) => {
    await PixelBoardService.getRecentsBoards(res);
}));

// Renvoi des 5 boards fermées en dernières
router.get('/lastclosed', wrapAsync(async (req,res) => {
    await PixelBoardService.getLastClosedBoards(res);
}))

// Renvoi  la validité ou non d'un nom de grille
router.get('/nameavail', async (req,res) => {
	await PixelBoardService.isNameAvailable(req, res);
});

// Vérifie si l'utilisateur à les droits supplémentaire sur la board
router.get('/checkrights', passport.authenticate("jwt"), wrapAsync(async (req,res) => {
	await PixelBoardService.checkRights(req, res);
}));

// Modification des propriétés d'une pixel board
router.patch('/', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await PixelBoardService.updatePixelBoard(req,res);
}));

// Modification d'un pixel d'une pixel board
router.patch('/pixel', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await PixelBoardService.updatePixelOfPixelBoard(req,res);
}));

// Création d'une pixel board
router.post('/', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await PixelBoardService.createPixelBoard(req,res);
}));

// Suppression d'une pixel board
router.delete('/', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await PixelBoardService.deletePixelBoard(req,res);
}));

module.exports = router;
