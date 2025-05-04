import { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

export const development: Knex.Config = {
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

export const test: Knex.Config = {
    ...development,
};

export const production: Knex.Config = {
    ...development,
};
