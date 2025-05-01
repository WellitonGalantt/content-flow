import { Knex } from 'knex';
import { db } from '../database/knex/connection'
import { ICreateUser, ICreateTelephone } from '../shared/types/authTypes';

export class AuthModels {
    static async createUser(userData: ICreateUser, trx: Knex.Transaction): Promise<number> {
        const result = await db('users').transacting(trx).insert(userData).returning('id');
        return result[0].id;
    }

    static async updateUser() {

    }

    static async deleteUser(userId:number) {
        await db('telephone').delete().where('user_id', userId);
        await db('users').delete().where('id', userId);
    }

    static async getUserById(userId: number) {
        return db('users').where('id', userId).first();
    }

    static async verifyExistUser(email: string) {
        return db('users').where('email', email).first();
    }

    static async createTelephone(telephoneData: ICreateTelephone, trx: Knex.Transaction) {
        await db('telephone').transacting(trx).insert(telephoneData);
    }
}