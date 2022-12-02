const express = require('express');
const { wrapAsync } = require('../lib/utils');
const userService = require('../services/user');
const User = require("../models/user")
const passport = require("passport")
const jwt = require("jsonwebtoken")


const router = express.Router();

router.get('/', wrapAsync(async (req, res) => {
	await userService.getById(req,res);
}))

router.get('/statCount', wrapAsync(async (req,res) => {
	await userService.countUser(req,res);
}));

router.patch('/', passport.authenticate("jwt"), wrapAsync(async (req, res) => {
	await userService.updateUser(req,res);
}));

router.post("/signup", (req, res, next) => {
	// Verify that first name is not empty
	
	if (!req.body.username) {
	  res.statusCode = 500
	  res.send({
		name: "UserNameError",
		message: "The userName is required",
	  })
	} else {
	  User.register(
		new User({ username: req.body.username,password: req.body.password,email: req.body.email}),
		req.body.password,
		(err, user) => {
		  if (err) {
			res.status(403).json({success: false,message: err});
		  } else {
			var token = jwt.sign({user_id:user._id}, "jhdshhds884hfhhs-ew6dhjd");
			user.save((err, user) => {
			  if (err) {
				res.status(500).json({success: false,message: err});
			  } else {
				res.cookie('jwt',token);
				res.status(200).json({ success: true, message: "l'utilisateur a été créé "+user._id })
			  }
			})
		  }
		}
	  )
	}
  })

router.post("/login", passport.authenticate("local"), (req, res, next) => {
	User.findById(req.user._id).then(
		user => {
		const token = jwt.sign({user_id:user._id, role:user.role}, "jhdshhds884hfhhs-ew6dhjd");
		user.save((err, user) => {
			if (err) {
				res.status(500).json({success: false,message: err});
			} else {
			res.cookie('jwt',token);
			res.status(200).json({ success: true, message: "l'utilisateur est connecte "+user._id })
			}
		})
		},
		err => next(err)
	)
})

router.get("/logout", passport.authenticate("jwt"), (req, res) => {
	res.clearCookie("jwt")
	res.send({ success: true, message:"l'utilisateur a ete deconnecte" })
})

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

router.get("/usernameavail", async (req, res) => {
	await userService.isUsernameAvailable(req, res);
})

passport.deserializeUser((username, done) => {
	User.findOne({ username: username }, (err, user) => done(err, user));
});

module.exports = router;

