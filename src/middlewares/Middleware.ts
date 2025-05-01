import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import StatusCodes from 'http-status-codes';
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

    static validateJwtToken() {
        return (req: Request, res: Response, next: NextFunction) => {
            const authHeader = req.headers.authorization
            const token = authHeader ? authHeader.split(' ')[1] : '';

            if (!token) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    sucess: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    data: {},
                    message: 'Erro ao pegar o token',
                    error: {error: 'Token nao encontrado'},
                })
                return;
            }

            const decodedToken = JwtToken.varifyToken(token);
            if(decodedToken instanceof Error){
                res.status(StatusCodes.BAD_REQUEST).json({
                    sucess: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    data: {},
                    message: 'Erro ao verificar o token',
                    error: decodedToken,
                })
                return;
            }

            req.user = decodedToken;
            next();
            return;
        }
    }
}
