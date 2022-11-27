const express = require('express');
const { wrapAsync } = require('../lib/utils');
const userService = require('../services/user');
const User = require("../models/user")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const { getToken, COOKIE_OPTIONS, getRefreshToken,verifyUser } = require("../authenticate")

const router = express.Router();

router.get('/get/:id', wrapAsync(async (req, res) => {
	const user = await userService.getById(req,res);
	return user;
}))

router.get('/statCount', wrapAsync(async (req,res) => {
	const PixelBoard = await userService.countUser(req,res);
	return PixelBoard;
}));

router.patch('/update', wrapAsync(async (req, res) => {
	const user = await userService.updateUser(req,res);
	return user;
}));

router.post("/signup", (req, res, next) => {
	// Verify that first name is not empty
	if (!req.query.username) {
	  res.statusCode = 500
	  res.send({
		name: "UserNameError",
		message: "The userName is required",
	  })
	} else {
	  User.register(
		new User({ username: req.query.username}),
		req.query.password,
		(err, user) => {
		  if (err) {
			res.statusCode = 500
			res.send(err)
		  } else {
			var token = jwt.sign({user_id:user._id}, "jhdshhds884hfhhs-ew6dhjd");
			user.save((err, user) => {
			  if (err) {
				console.error(err)
				res.statusCode = 500
				res.send(err)
			  } else {
				res.cookie('jwt',token);
				res.send({ success: true })
			  }
			})
		  }
		}
	  )
	}
  })

  router.post("/login", passport.authenticate("local"), (req, res, next) => {
	console.log("login")
	User.findById(req.user._id).then(
	  user => {
		var token = jwt.sign({user_id:user._id}, "jhdshhds884hfhhs-ew6dhjd");
		user.save((err, user) => {
		  if (err) {
			res.statusCode = 500
			res.send(err)
		  } else {
			res.cookie('jwt',token);
			res.send({ success: true })
		  }
		})
	  },
	  err => next(err)
	)
  })

  router.get("/logout", (req, res) => {
	res.clearCookie("jwt")
	res.send({ success: true })
  })

passport.deserializeUser((username, done) => {
	User.findOne({ username: username }, (err, user) => done(err, user));
});

router.get("/test",passport.authenticate("jwt"), (req, res) => {
	console.log(req.user)
})

module.exports = router;

