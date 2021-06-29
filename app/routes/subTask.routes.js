const controller = require('../controllers/subTask.controller');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	app.post('/subTask', controller.create);

	app.get('/subTask/:id', controller.getById);

	app.get('/subTask/', controller.getAll);

	app.delete('/subTask/:id', controller.delete);

	app.put('/subTask/:id', controller.update);

};
