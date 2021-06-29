const db = require('../models');
const SubTask = db.subTask;

exports.create = async (req, res) => {
	try {
		const subTask = new SubTask({
			description: req.body.description,
			taskId: req.body.taskId
		});
	
		subTask.save((err, subTask) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			res.status(200).send({ message: 'SubTask cadastrado com sucesso', subTask });
		});
	} catch (error) {
		res.status(500).send({ message: 'Erro ao cadastrar subTask', err: error });
	}
	
};

exports.delete = async (req, res) => {
	try {
		const del = await SubTask.deleteOne({ _id: req.params.id });
		res.status(del.n > 0 ? 200 : 500).send({ 
			message: del.n > 0 ? 'SubTask deletado com sucesso' : 'Erro ao deletar subTask' }
		);
	} catch (error) {
		res.status(500).send({ message: 'Erro ao deletar subTask -> ' + error });
	} 
};

exports.getAll = async (req, res) => {
	try {
		const subTasks = await SubTask.find();

		res.status(200).send({ message: 'SubTasks/s encontrado/s', subTasks });
	} catch (error) {
		res.status(500).send({ message: 'Erro ao buscar subTasks', err: error });
	}
};

exports.getById = async (req, res) => {
	try {
		const subTask = await SubTask.find({ _id: req.params.id });
		res.status(200).send({ message: 'SubTasks encontrado', subTask });
	} catch (error) {
		res.status(500).send({ message: 'Erro ao buscar subtask', err: error });
	}
};

exports.update = async (req, res) => {
	try {
		SubTask.findById(req.params.id, function (err, subTask) {
			if (err){
				res.status(500).send({ message: 'Erro ao atualizar subTask' });
				return;
			}

			subTask.description = req.body.description;
			subTask.taskId = req.body.taskId;

			subTask.save((err, subTask) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				res.status(200).send({ message: 'SubTasks atualizado com sucesso', subTask });
			});
		});

	} catch (error) {
		res.status(500).send({ message: 'Erro ao atualizar subTask', err: error });
	} 
};