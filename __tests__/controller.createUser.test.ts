import { AuthController } from '../src/controllers/AuthControllers';
import { AuthServices } from '../src/services/AuthServices';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

//criadno uma versao falsa do AuthService
jest.mock('../src/services/AuthServices');

describe('Controller -> registerUser', () => {
    //Definindo as tipagens
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        req = {
            body: {
                name: 'Welliton  GAlant CAETANO',
                email: 'wellitinho2@gmail.com',
                password: '123',
                confirm_password: '123',
                telephone: {
                    ddd: 333,
                    number: 888889990,
                    notfication: true,
                },
            },
        };

        //Simulando o .json() como uma funcao falsa
        jsonMock = jest.fn();
        //Simulando o .status().json() como uma funcao falsa
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        res = {
            status: statusMock,
        } as unknown as Response;
    });

    it('register user', async () => {
        //Definindo que o AuthServices.createUser é uma funcao falsa q retorna um valor especifico, para nao usar o service real
        (AuthServices.createUser as jest.Mock).mockResolvedValue(1);

        //Chamando o controller real pois queremos testar realmente ele;
        await AuthController.registerUser(req as Request, res as Response);

        expect(AuthServices.createUser).toHaveBeenCalledWith(req.body);
        expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
        expect(jsonMock).toHaveBeenCalledWith({
            sucess: true,
            statusCode: 200,
            data: { id: 1 },
            message: 'Usuario criado com sucesso!',
            error: {},
        });
    });
});

// | Parte do código                                                 | Explicação                                                                                   |
// | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
// | `jest.mock('../services/AuthServices')`                         | Diz ao Jest para transformar `AuthServices` em uma versão "falsa", onde os métodos são mocks |
// | `(AuthServices.createUser as jest.Mock).mockResolvedValue(...)` | Simula o retorno que `AuthServices.createUser` deveria ter                                   |
// | `req.body`                                                      | É o que seu controller vai usar para criar o usuário                                         |
// | `res.status().json()`                                           | Simulado por duas funções (`statusMock`, `jsonMock`)                                         |
// | `expect(...).toHaveBeenCalledWith(...)`                         | Garante que os métodos foram chamados corretamente                                           |
