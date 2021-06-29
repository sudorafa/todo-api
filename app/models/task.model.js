const mongoose = require('mongoose');

const Task = mongoose.model(
	'Task',
	new mongoose.Schema({
		description: String,
		subTasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'subTask',
			}
		],
		todoId: String
	})
);

module.exports = Task;
