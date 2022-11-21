const express = require("express");
const cookieParser = require('cookie-parser');
const cors         = require('cors');



const app = express();
const PORT = process.env.PORT || 3001;

const userAPI = require('./routes/user');
const mongodb     = require('./db/mongo');

mongodb.initClientDbConnection();

app.use(cors());

app.get('/', (req, res) => {
	res.status(404).send('notFound');
});

// Middleware qui permet de parser les réquetes qui ont un body en JSON
// https://expressjs.com/en/api.html#express.json

app.use(express.json());

app.use(cookieParser());
app.use('/user', userAPI);

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
