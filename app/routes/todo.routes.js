const controller = require('../controllers/todo.controller');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	app.post('/todo/', controller.create);

	app.get('/todo/:id', controller.getById);

	app.get('/todo/', controller.getAll);

	app.delete('/todo/:id', controller.delete);

	app.put('/todo/:id', controller.update);

};
