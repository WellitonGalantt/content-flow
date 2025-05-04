import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { IReturnDatas } from '../shared/types/appTypes';
import { JwtToken } from '../utils/JwtToken';

export class Middlewares {
    static validateSchema(schema: yup.ObjectSchema<any>) {
        return async (req: Request, res: Response<IReturnDatas>, next: NextFunction) => {
            try {
                await schema.validate(req.body, { abortEarly: false });
                next();
            } catch (error) {
                const yupError = error as yup.ValidationError;
                res.status(StatusCodes.BAD_REQUEST).json({
                    sucess: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    data: {},
                    message: 'Erro no envio dos dados!',
                    error: yupError.errors,
                });
                return;
            }
        };
    }

    static validateIdParam() {
        return (req: Request<{ id?: string }>, res: Response, next: NextFunction) => {
            const userId = Number(req.params.id);
            if (userId) {
                if (isNaN(userId)) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        statusCode: StatusCodes.BAD_REQUEST,
                        message: 'O parametro id deve ser um numero',
                        error: 'Id invalido',
                    });
                    return;
                }
            } else {
                res.status(StatusCodes.NO_CONTENT).json({
                    statusCode: StatusCodes.NO_CONTENT,
                    message: 'O parametro id do usuario deve ser origatorio!',
                    error: 'Id invalido',
                });
                return;
            }

            if (userId != req.user.id) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    sucess: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    data: {},
                    message: 'Erro de permisao!',
                    error: { error: 'Voce nao tem permisao para excluir outros usuraios!' },
                });
                return;
            }

            next();
        };
    }

    static validateJwtToken() {
        return (req: Request, res: Response, next: NextFunction) => {
            const authHeader = req.headers.authorization;
            const token = authHeader?.includes('Bearer') ? authHeader.split(' ')[1] : authHeader;

            if (!token) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    sucess: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    data: {},
                    message: 'Erro ao pegar o token',
                    error: { error: 'Token nao encontrado' },
                });
                return;
            }

            const decodedToken = JwtToken.varifyToken(token);
            if (decodedToken instanceof Error) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    sucess: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    data: {},
                    message: 'Erro ao verificar o token',
                    error: decodedToken,
                });
                return;
            }

            req.user = decodedToken;
            next();
            return;
        };
    }
}
