import { Request, Response } from 'express';
import { IRegisterUser, ITelephoneUser } from '../shared/types/authTypes';
import { IReturnDatas } from '../shared/types/appTypes';
import statusCode, { StatusCodes } from 'http-status-codes';
import { AuthServices } from '../services/AuthServices';
import { JwtToken } from '../utils/JwtToken';

export class AuthController {
    static async loginUser(req: Request<{}, {}, Omit<IRegisterUser, 'telephone'>>, res: Response<IReturnDatas>) {
        const data = req.body;
        const result = await AuthServices.loginUser(data);

        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: 'Erro ao fazer o login: ' + result.message,
                error: result
            })
            return;
        }

        const token = JwtToken.generateToken(result);

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: StatusCodes.OK,
            data: { token: token },
            message: 'Usuario logado com sucesso!',
            error: {}
        });
    }

    static async registerUser(req: Request<{}, {}, IRegisterUser>, res: Response<IReturnDatas>) {
        const data = req.body;
        const result = await AuthServices.createUser(data);
        if (result instanceof Error) {
            res.status(statusCode.BAD_REQUEST).json({
                sucess: false,
                statusCode: statusCode.BAD_REQUEST,
                data: {},
                message: result.message,
                error: { result },
            });
            return
        }

        res.status(statusCode.OK).json({
            sucess: true,
            statusCode: 200,
            data: { id: result },
            message: 'Usuario criado com sucesso!',
            error: {},
        });
    }

    static async deleteUser(req: Request<{ id?: number }>, res: Response) {
        const userId = req.params.id;

        if (userId) {
            if (isNaN(userId)) {
                res.status(statusCode.BAD_REQUEST).json({
                    sucess: false,
                    statusCode: statusCode.BAD_REQUEST,
                    data: {},
                    message: 'O parametro id deve ser um numero',
                    error: { error: 'Id invalido' },
                });
                return
            }
        } else {
            res.status(statusCode.NO_CONTENT).json({
                sucess: false,
                statusCode: statusCode.NO_CONTENT,
                data: {},
                message: 'O parametro id do usuario deve ser origatorio!',
                error: { error: 'Id invalido' },
            });
            return
        }

        if(userId != req.user.id){
            res.status(statusCode.BAD_REQUEST).json({
                sucess: false,
                statusCode: statusCode.BAD_REQUEST,
                data: {},
                message: 'Erro ao excluir usuario!',
                error: { error: 'Voce nao tem permisao para excluir outros usuraios!' },
            });
            return
        }

        const result = await AuthServices.deleteUser(userId);

        if (result instanceof Error) {
            res.status(statusCode.BAD_REQUEST).json({
                sucess: false,
                statusCode: statusCode.BAD_REQUEST,
                data: {},
                message: result.message,
                error: { result },
            });
            return
        }

        req.headers.authorization = '';
        req.user = {};

        res.status(statusCode.OK).json({
            sucess: true,
            statusCode: 200,
            data: userId,
            message: 'Usuario deletado com sucesso!',
            error: {},
        });
    }

    static async getUserById(req: Request<{ id: number }>, res: Response) {
        const userId = req.params.id;

        res.status(statusCode.OK).json({
            sucess: true,
            statusCode: 200,
            data: userId,
            message: 'Usuario achado com sucesso!',
            error: {},
        })

    }

}
