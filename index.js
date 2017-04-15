const path = require('path');
const program = require('commander');
const fs = require('fs-promise');
const dbConf = require('./databases.json');

let { env = 'development', db = 'default' } = program
 .option('--env [env]', 'input application environment. default development', String)
 .option('--db [db]', 'input database name. default service', String)
 .parse(process.argv);
let setting;

process.env.NODE_ENV = env;
process.env.db = db;
setting = dbConf[db][env];

if (env === 'production') {
   setting = JSON.parse(fs.readFileSync(`${process.cwd()}/../.dbSetting`, 'utf-8'))[db][env];
}

module.exports = {
 'url': `postgres://${ setting.user }:${ setting.password }@${ setting.host }:${ setting.port }/${ setting.database }`,
 'migrations-path': path.resolve('migrations', db)
}
