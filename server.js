const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;

// eslint-disable-next-line no-undef
const MONGODB_URL = 'mongodb://todotodo:todoappweb@kamino.mongodb.umbler.com:43829/todotodo';//process.env.MONGODB_URL;
db.mongoose
	.connect(MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Successfully connect to MongoDB.');
		initial();
	})
	.catch(err => {
		console.error('Connection error', err);
		// eslint-disable-next-line no-undef
		process.exit();
	});

// routes
require('./app/routes/todo.routes')(app);
require('./app/routes/task.routes')(app);
require('./app/routes/subTask.routes')(app);

// set port, listen for requests
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

function initial() {
	console.log('');
}
