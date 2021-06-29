const mongoose = require('mongoose');

const Todo = mongoose.model(
	'Todo',
	new mongoose.Schema({
		description: String,
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Task',
			}
		]
	})
);

module.exports = Todo;
