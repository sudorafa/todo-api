const controller = require('../controllers/task.controller');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	app.post('/task', controller.create);

	app.get('/task/:id', controller.getById);

	app.get('/task/', controller.getAll);

	app.delete('/task/:id', controller.delete);

	app.put('/task/:id', controller.update);

};
