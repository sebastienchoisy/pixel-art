const express = require('express');
const { wrapAsync } = require('../lib/utils');
const userService = require('../services/user');

const router = express.Router();

router.get('/:id', wrapAsync(async (req, res) => {
	const user = await userService.getById(req,res);
	return user;
}))

router.patch('/update', wrapAsync(async (req, res) => {
	const user = await userService.updateUser(req,res);
	return user;
}));

router.post('/add', wrapAsync(async (req, res) => {
	const user = await userService.createUser(req,res);
	return user;
}));

module.exports = router;

