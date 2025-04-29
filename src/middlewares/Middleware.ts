import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import StatusCodes from 'http-status-codes';
import { IReturnDatas } from '../shared/types/appTypes';

export class AuthMiddleware {
    static validateSchema(schema: yup.ObjectSchema<any>) {
        return async (req: Request, res: Response<IReturnDatas>, next: NextFunction) => {
            try {
                schema.validate(req.body, { abortEarly: true });
                next();
                return;
            } catch (error) {
                const yupError = error as yup.ValidationError;
                res.status(StatusCodes.BAD_REQUEST).json({
                    sucess: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    data: {},
                    message: 'Erro no envio dos dados!',
                    error: yupError,
                });
            }
        };
    }
}
