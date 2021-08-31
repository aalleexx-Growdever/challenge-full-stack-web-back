import Sequelize from 'sequelize';
	import databaseConfig from '../config/database';
	*** import de todos os models(pode ser pelo arquivo index.js dentro da pasta models para agilizar os imports) ***

	const models = [*** aqui vão todos os models importados na app ***];

	class Database {
		constructor() {
			this.init();
		}

		init() {
			this.connection = new Sequelize(databaseConfig);

			models
				.map(model => model.init(this.connection))
				.map(model => model.associate && model.associate(this.connection.models));
		}
	}

	export default new Database();