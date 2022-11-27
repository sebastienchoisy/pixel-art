const express = require("express");
const cookieParser = require('cookie-parser');
const cors         = require('cors');
const passport = require("passport")
const session = require("express-session")

require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate")

const app = express();
const PORT = process.env.PORT || 3001;

const userAPI = require('./routes/user');
const pixelBoardAPI = require('./routes/pixelBoard');

const mongodb     = require('./db/mongo');

mongodb.initClientDbConnection();

const corsOptions = {
	origin: function (origin, callback) {
	  if (!origin || whitelist.indexOf(origin) !== -1) {
		callback(null, true)
	  } else {
		callback(new Error("Not allowed by CORS"))
	  }
	},
  
	credentials: true,
  }

app.use(cors(corsOptions))
app.use(cookieParser("jhdshhds884hfhhs-ew6dhjd"))
app.use(session({  
	secret: 'coder-session', 
	resave: false, 
	saveUninitialized: false  }));
app.use(passport.initialize())
app.use(passport.session())
/*const User = new mongoose.model("user", userAPI);
passport.use(User.createStrategy());
  
// Serializing and deserializing
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());*/
app.get('/', (req, res) => {
	res.status(404).send('notFound');
});

// Middleware qui permet de parser les réquetes qui ont un body en JSON
// https://expressjs.com/en/api.html#express.json

app.use(express.json());

app.use(cookieParser());
app.use('/user', userAPI);
app.use('/pixelBoard', pixelBoardAPI);

app.use((err, req, res, next) => {
	// eslint-disable-next-line no-console
	console.error(err.stack);
	if (res.headersSent) {
		return next(err);
	}
	return res.status(500).send('Something broke!');
});

const server = app.listen(PORT, () => {
	const { port } = server.address();
	// eslint-disable-next-line no-console
	console.log(`Application started. Visit http://localhost:${port}`);
});
module.exports = app;
