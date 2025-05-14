import { createContentScript } from '../agents/textApiAi';
import { writeFile, readFile } from 'fs/promises';
import { ICreateProjectData, IRoteiro, IUpScriptData, ITagData, IUpProjectData, IUpdateProjectData } from '../shared/types/appTypes';
import { projectModels } from '../models/ProjectModels';
import { jsonrepair } from 'jsonrepair';
import { db } from '../database/knex/connection';

export class ProjectServices {
    static async createProject(data: ICreateProjectData, userId: number): Promise<Error | null> {
        try {
            const scriptData = await createContentScript(data.text);
            if (scriptData) {
                const match = scriptData.choices[0].message.content.match(/```json\s*([\s\S]*?)\s*```/); // ([\s\S]*?): pega todos os caracteres entre esses delimitadores
                if (match && match[1]) {
                    //Retorna um array com os dados ```json, o conteudo do meio, e ```, tres valores
                    const conteudoLimpo = jsonrepair(match[1].trim());
                    const scriptJson: IRoteiro = await JSON.parse(conteudoLimpo);
                    const projectObj: IUpProjectData = {
                        title: data.title,
                        user_id: userId,
                        date_submit: data.date_submit,
                    };

                    await db.transaction(async (trx) => {
                        const projectId = await projectModels.createProject(projectObj, trx);

                        if (projectId) {
                            const scriptObj: IUpScriptData = {
                                user_text: data.text,
                                ia_text: scriptJson,
                                project_id: projectId,
                            };
                            await projectModels.createScript(scriptObj, trx);

                            await projectModels.setProjectTag(projectId, 1, trx);
                        }
                    });
                }
            }

            return null;
        } catch (erro: any) {
            return erro;
        }
    }

    static async getAllProject(userId: number): Promise<Object | Error | null> {
        try {
            const result = await projectModels.getAllProject(userId);
            if (!result) {
                return null;
            }

            return result;
        } catch (err: any) {
            console.log(err);
            return null;
        }
    }

    static async getProjectById(projectId: number, userId: number): Promise<Object | Error> {
        try {
            const result = await projectModels.getProjectById(projectId, userId)
            if(!result){
                return new Error('Nao foi posivel encontrar projeto com esse id!');
            }

            return result;
        }
        catch (err:any) {
            return err
        }
    }

    static async updateProject(projectId: number, userId: number, projectData: IUpdateProjectData) { 
        try{
            const existProject = await projectModels.existProject(projectId);
            if(!existProject){
                return new Error('Nao existe um projeto com esse ID!');
            }

            let updateData: IUpdateProjectData = {}

            if(existProject.title != projectData.title){
                updateData.title = projectData.title
            }

            if(projectData.date_submit){
                const data1 = new Date(projectData.date_submit);
                const data2 = new Date(existProject.date_submit);

                //retorna o tempo, se for invalido retorna nan e o isNaN retorna boolean
                if(isNaN(data1.getTime()) || isNaN(data2.getTime())){
                    return new Error('Uma das datas sao invalidas!')
                }
                
                if(data1 != data2){
                    updateData.date_submit = projectData.date_submit
                }
            }

            if(updateData){
                updateData.updated_at = new Date(Date.now()).toISOString();
                await projectModels.updateProject(updateData, projectId, userId);
            }

        }
        catch ( err: any ){
            if( err instanceof Error){
                return err;
            }else{
                return new Error('Um erro desconhecido aconteceu: ' + err)
            }
        }
     }

    static async deleteProjectById() { }

    static async createTag(dataTag: ITagData) {
        await projectModels.createTag(dataTag);
    }

    static async getTagById() { }

    static async getAllTag() { }

    static async deleteTagById() { }
}
