import { Request, Response } from 'express';
import { IRegisterUser, ITelephoneUser } from '../shared/types/authTypes';
import { IReturnDatas } from '../shared/types/appTypes';
import { StatusCodes } from 'http-status-codes';
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
                error: result,
            });
            return;
        }

        const token = JwtToken.generateToken(result);

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: StatusCodes.OK,
            data: { token: token },
            message: 'Usuario logado com sucesso!',
            error: {},
        });
    }

    static async registerUser(req: Request<{}, {}, IRegisterUser>, res: Response<IReturnDatas>) {
        const data = req.body;
        const result = await AuthServices.createUser(data);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: result.message,
                error: { result },
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: 200,
            data: { id: result },
            message: 'Usuario criado com sucesso!',
            error: {},
        });
    }

    static async deleteUser(req: Request, res: Response) {
        const userId = Number(req.params.id);

        const result = await AuthServices.deleteUser(userId);

        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: result.message,
                error: { result },
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: 200,
            data: userId,
            message: 'Usuario deletado com sucesso!',
            error: {},
        });
    }

    static async getUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);

        const result = await AuthServices.getUserById(userId);

        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: result.message,
                error: { result },
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: 200,
            data: result,
            message: 'Usuario encontrado com sucesso!',
            error: {},
        });
    }
}
