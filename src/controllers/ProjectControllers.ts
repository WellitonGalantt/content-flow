import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProjectServices } from '../services/ProjectServices';
import { ICreateProjectData, ITagData } from '../shared/types/appTypes';

export class ProjectControllers {
    static async createProject(req: Request<{}, {}, ICreateProjectData>, res: Response) {
        const data = req.body;
        const userId = req.user.id;

        const result = await ProjectServices.createProject(data, userId);

        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: `Erro ao criar o projeto: ${result.message}`,
                error: result,
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: 200,
            data: data,
            message: 'Projeto criado com sucesso!',
            error: {},
        });
        return;
    }
    static async getAllProject(req: Request, res: Response) {}

    static async getProjectById(req: Request, res: Response) {}

    static async updateProject(req: Request, res: Response) {}

    static async deleteProject(req: Request, res: Response) {}

    static async createTag(req: Request<{}, {}, ITagData>, res: Response) {
        const dataTag = req.body;
        await ProjectServices.createTag(dataTag);

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: StatusCodes.OK,
            data: {},
            message: 'Tag criada com sucesso!',
            error: {},
        });
    }
}
