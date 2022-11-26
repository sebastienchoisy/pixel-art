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
			const token = getToken({ _id: user._id })
			const refreshToken = getRefreshToken({ _id: user._id })
			user.refreshToken.push({ refreshToken })
			user.save((err, user) => {
			  if (err) {
				console.error(err)
				res.statusCode = 500
				res.send(err)
			  } else {
				res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
				res.send({ success: true, token })
			  }
			})
		  }
		}
	  )
	}
  })

  router.post("/login", passport.authenticate("local"), (req, res, next) => {
		console.log("login")

	const token = getToken({ _id: req.user._id })
	const refreshToken = getRefreshToken({ _id: req.user._id })
	User.findById(req.user._id).then(
	  user => {
		user.refreshToken.push({ refreshToken })
		user.save((err, user) => {
		  if (err) {
			res.statusCode = 500
			res.send(err)
		  } else {
			res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
			res.send({ success: true, token })
		  }
		})
	  },
	  err => next(err)
	)
  })

  router.get("/logout", verifyUser, (req, res, next) => {
	const { signedCookies = {} } = req
	const { refreshToken } = signedCookies
	User.findById(req.user._id).then(
	  user => {
		const tokenIndex = user.refreshToken.findIndex(
		  item => item.refreshToken === refreshToken
		)
  
		if (tokenIndex !== -1) {
		  user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
		}
  
		user.save((err, user) => {
		  if (err) {
			res.statusCode = 500
			res.send(err)
		  } else {
			res.clearCookie("refreshToken", COOKIE_OPTIONS)
			res.send({ success: true })
		  }
		})
	  },
	  err => next(err)
	)
  })

 router.post("/refreshToken", async (req, res, next) => {
	const { signedCookies = {} } = req
	const { refreshToken } = signedCookies  
	if (refreshToken) {
	  try {
		const payload = jwt.verify(refreshToken, "fgkjddshfdjh773bdjsj84-jdjd774")
		const userId = payload._id
		await User.findOne({ _id: userId }).then(
		  user => {
			if (user) {
			  // Find the refresh token against the user record in database
			  const tokenIndex = user.refreshToken.findIndex(
				item => item.refreshToken === refreshToken
			  )
			  if (tokenIndex === -1) {
				res.statusCode = 401
				res.send("Unauthorized")
			  } else {
				const token = getToken({ _id: userId })
				// If the refresh token exists, then create new one and replace it.
				const newRefreshToken = getRefreshToken({ _id: userId })
				user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
				user.save((err, user) => {
				  if (err) {
					console.error(err)
					res.statusCode = 500
					res.send(err)
				  } else {
					res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
					res.send({ success: true, token })
				  }
				})
			  }
			} else {
			  res.statusCode = 401
			  res.send("Unauthorized")
			}
		  },
		  err => next(err)
		)||false
	  } catch (err) {
		res.statusCode = 401
		res.send("Unauthorized")
	  }
	} else {
	  res.statusCode = 401
	  res.send("Unauthorized")
	}
  })

  passport.serializeUser((user, done) => {
	console.log("serializeUser")
	done(null, user._id);
});

passport.deserializeUser((username, done) => {
	console.log("deserializeUser")
	const value = User.findOne({ username: username }, (err, user) => done(err, user));
});

module.exports = router;

