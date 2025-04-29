import { Request, Response } from 'express';
import { IRegisterUser, ITelephoneUser } from '../shared/types/authTypes';
import { IReturnDatas } from '../shared/types/appTypes';
import statusCode from 'http-status-codes';

export class AuthController {
    static loginUser(req: Request<{}, {}, Omit<IRegisterUser, 'telephone'>>, res: Response<IReturnDatas>) {
        const userData = req.body;
        console.log('ola');
        res.status(200).json({
            sucess: true,
            statusCode: 200,
            data: userData,
            message: 'Usuario criado com sucesso!',
            error: {},
        });
    }

    static registerUser(req: Request<{}, {}, IRegisterUser>, res: Response<IReturnDatas>) {
        const userData = req.body;
        res.status(statusCode.OK).json({
            sucess: true,
            statusCode: 200,
            data: userData,
            message: 'Usuario criado com sucesso!',
            error: {},
        });
    }

    static registerTelephone(req: Request<{}, {}, ITelephoneUser>, res: Response<IReturnDatas>) {
        const telephoneData = req.body;
        res.status(statusCode.OK).json({
            sucess: true,
            statusCode: 200,
            data: telephoneData,
            message: 'Usuario criado com sucesso!',
            error: {},
        });
    }

    static deleteUser(req: Request, res: Response) {
        const userId = req.params.id;
        res.status(statusCode.OK).json({
            sucess: true,
            statusCode: 200,
            data: userId,
            message: 'Usuario criado com sucesso!',
            error: {},
        });
    }
}
