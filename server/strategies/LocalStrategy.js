const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")

// Stratégie local , on compare l'username et le mot de passe avec ceux en DB
passport.use(new LocalStrategy(User.authenticate()))

// On sérialise l'utilisateur pour pouvoir y accèder avec req.user après la connexion
passport.serializeUser(User.serializeUser())