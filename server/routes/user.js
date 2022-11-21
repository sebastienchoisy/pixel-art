const express = require('express');
const { wrapAsync } = require('../lib/utils');
const userService = require('../services/user');

const router = express.Router();
//router.get('/:id', userService.getByName);

//router.post('/add', userService.createUser);

//router.patch('/update', userService.updateUser);
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

/*
router.use((req, res, next) => {
	// eslint-disable-next-line no-console
	console.log(`USER API - ${req.method} request for ${req.url}`);
	next();
});

router.get('/',
	wrapAsync(async (req, res) => {
		try {
			const users = await userService.getUser();
			return res.json(users);// TODO : A MODIFIER
		} catch (err) {
			return res.status(500).json({ error: err.message });// TODO : A MODIFIER
		}
	}));

router.post('/', wrapAsync(async (req, res) => {
	const user = req.body;
	await userService.createUser(user);
	return res.json(user);// TODO : A MODIFIER
}));

router.post('/', wrapAsync(async (req, res) => {
	const user = req.body;
	await userService.updateUser(user);
	return res.json(user);// TODO : A MODIFIER
}));

module.exports = router;*/
