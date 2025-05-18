// knexfile.cjs
require('ts-node').register({
    transpileOnly: true, // opcional: só transpila, sem checagem de tipo, mais rápido
});
module.exports = require('./src/database/knex/knexfile.ts').default;
