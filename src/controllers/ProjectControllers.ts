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
    static async getAllProject(req: Request, res: Response) {
        const userId = req.user.id;
        const result = await ProjectServices.getAllProject(userId);

        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: `Nao foi possivel retornar os projetos!`,
                error: {},
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: StatusCodes.OK,
            data: result,
            message: `Sucesso ao pegar os projetos`,
            error: {},
        });
        return;
    }

    static async getProjectById(req: Request<{ id?: string }>, res: Response) {
        const projectId = Number(req.params.id);
        const userId = req.user.id;
        if (!projectId) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: `O parametro id é obrigatório!!`,
                error: {},
            });
            return;
        }
        const result = await ProjectServices.getProjectById(projectId, userId);

        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: `Error ao peagar tarefa`,
                error: result.message,
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: StatusCodes.OK,
            data: result,
            message: `Sucesso ao pegar os projetos`,
            error: {},
        });
        return;
    }

    static async updateProject(req: Request<{ id?: string }, {}, ICreateProjectData>, res: Response) {
        const projectId = Number(req.params.id);
        const projectData = req.body;
        const userId = req.user.id;
        if (!projectId) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: `O parametro id é obrigatório!!`,
                error: {},
            });
            return;
        }
        const result = await ProjectServices.updateProject(projectId, userId, projectData);

        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: `Erro ao atualizar o projeto.`,
                error: result.message,
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: StatusCodes.OK,
            data: result,
            message: 'Projeto aualizado com sucesso',
            error: {},
        });
    }

    static async deleteProjectById(req: Request, res: Response) {}

    //------ tags ----

    static async createTag(req: Request<{}, {}, ITagData>, res: Response) {
        const dataTag = req.body;
        const userId = req.user.id;

        const result = await ProjectServices.createTag(dataTag, userId);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                statusCode: StatusCodes.BAD_REQUEST,
                data: {},
                message: 'Erro ao Criar a tag',
                error: result,
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            statusCode: StatusCodes.OK,
            data: result,
            message: 'Tag criada com sucesso!',
            error: {},
        });
    }

    static async getTagById(req: Request<{}, {}, ITagData>, res: Response) {}

    static async getAllTag(req: Request<{}, {}, ITagData>, res: Response) {}

    static async deleteTagById(req: Request<{}, {}, ITagData>, res: Response) {}
}
