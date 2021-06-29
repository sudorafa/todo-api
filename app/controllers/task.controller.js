const db = require('../models');
const Task = db.task;
const SubTask = db.subTask;

exports.create = async (req, res) => {
	try {
		const task = new Task({
			description: req.body.description,
			todoId: req.body.todoId
		});
	
		task.save((err, task) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			res.status(200).send({ message: 'Task cadastrado com sucesso', task });
		});
	} catch (error) {
		res.status(500).send({ message: 'Erro ao cadastrar task', err: error });
	}
	
};

exports.delete = async (req, res) => {
	try {
		await SubTask.deleteMany({ taskId: req.params.id });
		const del = await Task.deleteOne({ _id: req.params.id });
		res.status(del.n > 0 ? 200 : 500).send({ 
			message: del.n > 0 ? 'Task deletado com sucesso' : 'Erro ao deletar task' }
		);
	} catch (error) {
		res.status(500).send({ message: 'Erro ao deletar task -> ' + error });
	} 
};

exports.getAll = async (req, res) => {
	try {
		const tasks = await Task.find();
		const subTask = await SubTask.find();

		const newTasks = tasks?.map(task => {
			const subTasksFilter = subTask.filter(f=> f?.taskId === task?._id.toString());
			return {
				...task._doc,
				subTasks: subTasksFilter
			}
		});

		res.status(200).send({ message: 'Task/s encontrado/s', tasks: newTasks });
	} catch (error) {
		res.status(500).send({ message: 'Erro ao buscar tasks', err: error });
	}
};

exports.getById = async (req, res) => {
	try {
		const task = await Task.find({ _id: req.params.id });
		const subTasks = await SubTask.find({ taskId: req.params.id });
    
		const newTask = {
			...task,
			subTasks
		}

		res.status(200).send({ message: 'Task encontrado', task: newTask });
	} catch (error) {
		res.status(500).send({ message: 'Erro ao buscar ', err: error });
	}
};

exports.update = async (req, res) => {
	try {
		Task.findById(req.params.id, function (err, task) {
			if (err){
				res.status(500).send({ message: 'Erro ao atualizar task' });
				return;
			}

			task.description = req.body.description;
			task.todoId = req.body.todoId;

			task.save((err, task) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				res.status(200).send({ message: 'Task atualizado com sucesso', task });
			});
		});

	} catch (error) {
		res.status(500).send({ message: 'Erro ao atualizar task', err: error });
	} 
};