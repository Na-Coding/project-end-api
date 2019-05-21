// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    version: '10.2',
    connection: {
      database: 'test_migration',
      user:     'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'test_migration'
    }
  }

};

// var knex = require('knex')

// module.exports = knex({
//   client: 'mysql',
//   version: '10.1',
//   connection: {
//     host : '127.0.0.1',
//     user : 'root',
//     password : '',
//     database : 'test_migration'
//   }
// });

