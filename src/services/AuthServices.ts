import { IRegisterUser, ICreateTelephone, ICreateUser } from '../shared/types/authTypes';
import { AuthModels } from '../models/AuthModels';
import { EncriptionPassword } from '../utils/EncriptionPassword';
import { db } from '../database/knex/connection';

export class AuthServices {
    static async createUser(data: IRegisterUser): Promise<Error | number> {
        try {
            return await db.transaction(async (trx) => {
                // Transaction serve para criar uma query em conjunto, para uma mesma transacao
                const verifyUser = await AuthModels.verifyExistUser(data.email);

                if (verifyUser) {
                    return new Error('Usuario com esse email ja existe!');
                }

                data.password = await EncriptionPassword.encriptPassword(data.password);
                data.name = data.name
                    .trim()
                    .replace(/\s+\g/, ' ') // rgex limpa espacos a mais que contem no nome: "Cleiyto   da Silva"
                    .toLowerCase()
                    .split(' ')
                    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
                    .join(' ');

                const userData: ICreateUser = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                };
                const idUser = await AuthModels.createUser(userData, trx);
                const telehponeData: ICreateTelephone = {
                    ddd: data.telephone.ddd,
                    number: data.telephone.number,
                    notfication: data.telephone?.notfication,
                    user_id: idUser,
                };

                await AuthModels.createTelephone(telehponeData, trx);

                return idUser;
            });
        } catch (err) {
            if (err instanceof Error) {
                return err;
            } else {
                return new Error('Error desconhecido aconteceu: ' + err);
            }
        }
    }

    static async loginUser(data: ICreateUser): Promise<Error | number> {
        try {
            const verifyUser = await AuthModels.verifyExistUser(data.email);
            if (!verifyUser) {
                return new Error('Nao existe um usuario com esse email!');
            }

            const verifyPassword = await EncriptionPassword.verifyPasswordHash(data.password, verifyUser.password);
            if (!verifyPassword) {
                return new Error('Senha invalida!, tente novamente!');
            }
            return verifyUser.id;
        } catch (err) {
            if (err instanceof Error) {
                return err;
            } else {
                return new Error('Aconteceu um erro desconhecido: ' + err);
            }
        }
    }

    static async updateUser() {}

    static async deleteUser(userId: number): Promise<Error | void> {
        try {
            const verifyUser = await AuthModels.getUserById(userId);
            if (!verifyUser) {
                return new Error('Usuario nao encontrado, Id invalido!');
            }

            await AuthModels.deleteUser(userId);
        } catch (err) {
            if (err instanceof Error) {
                return err;
            } else {
                return new Error('Aconteceu um erro desconhecido: ' + err);
            }
        }
    }

    static async getUserById(userId: number): Promise<object | Error> {
        try {
            const verifyExistUser = await AuthModels.getUserById(userId);
            if (!verifyExistUser) {
                return new Error('Usuario nao encontrado!');
            }

            return verifyExistUser;
        } catch (err) {
            if (err instanceof Error) {
                return err;
            } else {
                return new Error('Aconteceu um erro desconhecido: ' + err);
            }
        }
    }
}
