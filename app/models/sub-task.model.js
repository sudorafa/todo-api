const mongoose = require('mongoose');

const subTask = mongoose.model(
	'subTask',
	new mongoose.Schema({
		description: String,
		taskId: String
	})
);

module.exports = subTask;
