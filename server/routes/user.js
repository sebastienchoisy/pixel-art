const express = require('express');
const { wrapAsync } = require('../lib/utils');
const userService = require('../services/user');
const User = require("../models/user")
const passport = require("passport")


const router = express.Router();

// Renvoi d'un utilisateur avec l'id correspond passé en query
router.get('/', wrapAsync(async (req, res) => {
	await userService.getById(req,res);
}))

// Renvoi du nombre total d'utilisateur
router.get('/count', wrapAsync(async (req,res) => {
	await userService.countUser(req,res);
}));

// Modification d'un utilisateur (strategie jwt => connexion requise)
router.patch('/', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await userService.updateUser(req,res);
}));

// Création d'un utilisateur
router.post("/signup", async (req, res) => {
	await userService.signup(req, res);
});

// Connexion d'un utilisateur (stratégie local => on compare les identifiants données avec ceux en db)
router.post("/login", wrapAsync(async (req, res, next) => {
	passport.authenticate('local', async (err, user) => {
		if (err) {
			return next(err);
		}
		if (user) {
			await userService.login(req, res, next);
		} else {
			return res.status(200).send({success: false, message:'Mauvais identifiants'});
		}
	})(req, res, next);

}));

// Déconnexion d'un utilisateur (strategie jwt => connexion requise)
router.get("/logout", passport.authenticate("jwt"), (req, res) => {
	res.clearCookie("jwt");
	res.send({ success: true, message:"l'utilisateur a ete deconnecte" });
})

// Renvoi de l'état de connexion pour garder la connexion tant que le token est valide (strategie jwt => connexion requise)
router.get("/loginstatus", (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user) => {
		if(err) {
			res.status(500).json({success: false,message: err});
		}
		if(user) {
			res.status(200).json({success: true, user: user});
		} else {
			res.status(200).json({success: false, user: null});
		}
	})(req, res, next)
})

// Renvoi de la validité ou non d'un username
router.get("/usernameavail", async (req, res) => {
	await userService.isUsernameAvailable(req, res);
})

passport.deserializeUser((username, done) => {
	User.findOne({ username: username }, (err, user) => done(err, user));
});

module.exports = router;

