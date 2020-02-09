const config = require('../config');
const qs = require('qs');
const fastify = require('fastify')({
  logger: config.shouldFastifyLog,
  pluginTimeout: 60000,
  querystringParser: str => qs.parse(str),
});
const swagger = require('../swagger-config');
const sequelizeInstance = require('./dbConnection');

(async () => {
  try {
		fastify.register(require('fastify-swagger'), swagger.options);
    sequelizeInstance.query('EXEC sp_msforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT all"')
      .then(function(){
          return sequelizeInstance.sync({ force: config.db.forceTableCreation });
      })
      .then(function(){
          return sequelizeInstance.query('EXEC sp_msforeachtable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT all"')
      })
      .then(function(){
          console.log('Database synchronised.');
      }, function(err){
          console.log(err);
			});
		fastify.register(require('./Patient'), {prefix: '/api'});
    await fastify.listen(config.port, config.serverHost);
    fastify.swagger();
    fastify.log.info(`Server is listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

module.exports = fastify;