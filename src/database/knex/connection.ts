import knex from 'knex';
import { development, test, production } from './knexfile';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const getEnvoriment = () => {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return development;
        case 'production':
            return production;
        case 'test':
            return test;
        default:
            return development;
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
