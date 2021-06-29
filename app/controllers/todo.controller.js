const db = require('../models');
const Todo = db.todo;
const Task = db.task;
const SubTask = db.subTask;

exports.create = async (req, res) => {
	try {
		const todo = new Todo({
			description: req.body.description,
		});
	
		todo.save((err, todo) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			res.status(200).send({ message: 'Todo cadastrado com sucesso', todo });
		});
	} catch (error) {
		res.status(500).send({ message: 'Erro ao cadastrar todo', err: error });
	}
	
};

exports.delete = async (req, res) => {
	try {
		const tasks = await Task.find({ 'todoId': req.params.id });
		for (let i = 0; i < tasks.length; i++) {
			await SubTask.deleteMany({ taskId: tasks[i]._id });
			await Task.deleteOne({ _id: tasks[i]._id });
		}
		const del = await Todo.deleteOne({ _id: req.params.id });
		res.status(del.n > 0 ? 200 : 500).send({ 
			message: del.n > 0 ? 'Todo deletado com sucesso' : 'Erro ao deletar todo' }
		);
	} catch (error) {
		res.status(500).send({ message: 'Erro ao deletar todo -> ' + error });
	} 
};

exports.getAll = async (req, res) => {
	try {
		const todos = await Todo.find();
		const tasks = await Task.find();
		const subTask = await SubTask.find();

		const newTodos = todos.map(todo => {
			const taskFilter = tasks.filter(f=> f?.todoId === todo?._id.toString());
			
			const newTasks = taskFilter?.map(task => {
				const subTasksFilter = subTask.filter(f=> f?.taskId === task?._id.toString());
				return {
					...task?._doc,
					subTasks: subTasksFilter
				}
			})
			return {
				...todo._doc,
				tasks: newTasks
			}
		});

		res.status(200).send({ message: 'TODO/s encontrado/s', todos: newTodos });
	} catch (error) {
		res.status(500).send({ message: 'Erro ao buscar todos', err: error });
	}
};

exports.getById = async (req, res) => {
	try {
		const todo = await Todo.findOne({ _id: req.params.id });
		const tasks = await Task.find({ todoId: req.params.id });
		const subTask = await SubTask.find();
    
		const newTodo = {
			...todo._doc,
			tasks: tasks.map(task => {
				const subTasksFilter = subTask.filter(f=> f?.taskId === task?._id.toString());
				return {
					...task._doc,
					subTasks: subTasksFilter
				}
			}),
		};

		res.status(200).send({ message: 'Todo encontrado', todos: newTodo });
	} catch (error) {
		res.status(500).send({ message: 'Erro ao buscar todo', err: error });
	}
};

exports.update = async (req, res) => {
	try {
		Todo.findById(req.params.id, function (err, todo) {
			if (err){
				res.status(500).send({ message: 'Erro ao atualizar todo' });
				return;
			}

			todo.description = req.body.description;

			todo.save((err, todo) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				res.status(200).send({ message: 'Todo atualizado com sucesso', todo });
			});
		});
	} catch (error) {
		res.status(500).send({ message: 'Erro ao atualizar todo', err: error });
	} 
};