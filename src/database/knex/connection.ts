import knex from 'knex';
import dbConfig from './knexfile.js';
import dotenv from 'dotenv';

dotenv.config();

const getEnvoriment = () => {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return dbConfig.development;
        case 'production':
            return dbConfig.production;
        case 'test':
            return dbConfig.test;
        default:
            return dbConfig.development;
    }
};

export const db = knex(getEnvoriment());

export const testDbConnection = async () => {
    try {
        await db.raw('SELECT 1+1 AS result');
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar com o banco de dados:', error);
        process.exit(1);
    }
};
