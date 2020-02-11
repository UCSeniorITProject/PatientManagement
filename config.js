  
module.exports = {
  db: {
    host: process.env.dbHost || 'safemeds.database.windows.net',
    dialect: 'mssql',
    maxConnectionSockets: 10,
    minConnectionSockets: 5,
    connectionAcquisitionRate: 30000,
    databaseName: process.env.dbName || 'SafeMeds',
    username: process.env.adminUser || 'safemedsadmin@safemeds',
    password: process.env.password || 'qweqweqweqwe',
    connectionIdleRate: 10000,
    port: 1433,
    //DO NOT TURN THIS TO TRUE YOU WILL DROP EVERY TABLE
    forceTableCreation: false,
    shouldLog: true,
	},
	encryptionKey: process.env.encryptionKey || 'qweqweqweqwe',
  jwtDurationMinutes: '15',
  jwtRefreshDurationHours: '20',
  saltRounds: 8,
  jwtSecret: process.env.jwtSecret || 'qweqweqweqwe',
  jwtRefreshTokenSecret: process.env.jwtRefreshTokenSecret || 'qweqweqqweqweqweweqwe',
  shouldFastifyLog: true,
  serverHost:  process.env.serverAddress || '0.0.0.0' ,
  port: process.env.port || '3004',
};
