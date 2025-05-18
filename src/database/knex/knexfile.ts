import { Knex } from 'knex';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules a variavel __dirname nao existe, o import .meta.url retoirna o caminho absoluto do arquivo atual
//e o fileURLToPath trnaforma a url em um caminho de diretorio
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const dbConfigBase = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DBNAME,
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
};

const dbConfig: { [key: string]: Knex.Config } = {
    development: { ...dbConfigBase },
    test: { ...dbConfigBase },
    production: { ...dbConfigBase },
};

export default dbConfig;
