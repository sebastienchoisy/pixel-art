require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require("passport");
const session = require("express-session");
const WebSocket = require('ws');
const cron = require("node-cron");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");

const app = express();
const PORT = process.env.PORT || 3001;

const PixelBoard = require("./models/pixelBoard");
const userAPI = require('./routes/user');
const pixelBoardAPI = require('./routes/pixelBoard');
const mongodb = require('./db/mongo');

mongodb.initClientDbConnection();

const corsOptions = {
	credentials: true,
};

app.use(cors(corsOptions)); //Enable CORS Requests only for origin set in options
app.use(cookieParser(process.env.JWT_SECRET));
app.use(session({  
	secret: 'coder-session', 
	resave: false, 
	saveUninitialized: false  }));
app.use(passport.initialize());
app.use(passport.session());

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
	if (res.headersSent) {
		return next(err);
	}
	return res.status(500).send('Something broke!');
});

// On check si la date actuelle est supérieur à la date de closure, si oui, on passe isClosed à true
const checkPixelBoardClosure = async () => {
	for await (const board of PixelBoard.find()) {
		if(new Date() > new Date(board.dateOfClosure)) {
			board.isClosed = true;
			board.save();
		};
	}
}

// Tâche prévue tous les jours à minuit & au lancement du serveur pour vérifier que les boards qui ont dépassé la date de
// closure sont bien fermées

checkPixelBoardClosure().then(() => console.log("Closure check done"));

cron.schedule("0 0 0 * * *", function () {
	checkPixelBoardClosure().then(() => console.log("Closure check done"));
});

const server = app.listen(PORT, () => {
	const { port } = server.address();
	// eslint-disable-next-line no-console
	console.log(`Application started. Visit http://localhost:${port}`);
});

const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
	console.log('Client connected');
	ws.on('close', () => console.log('Client disconnected'));
});



const sendMessageToClients = (message) => {
	wss.clients.forEach((client) => {
		client.send(message);
	});
}

module.exports.sendMessageToClients = sendMessageToClients;