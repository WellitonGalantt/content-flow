import { Knex } from 'knex';
import { db } from '../database/knex/connection';
import { IUpScriptData, ITagData, IUpProjectData } from '../shared/types/appTypes';

export class projectModels {
    static async existProject(projectId: number){
        return await db('project').where('id', projectId).first();
    }
    static async createProject(projectObj: IUpProjectData, trx: Knex.Transaction): Promise<number | void> {
        const [result] = await db('project').transacting(trx).insert(projectObj).returning('id');
        return result.id;
    }
    static async createScript(scriptObj: IUpScriptData, trx: Knex.Transaction): Promise<void> {
        await db('script').transacting(trx).insert(scriptObj);
        return;
    }

    static async getAllProject(userId: number): Promise<Object> {
        return await db('project as p')
            .leftJoin('script as s', 'p.id', 's.project_id')
            .select(
                'p.id as project_id',
                'p.title as project_title',
                'p.user_id as user_id',
                's.id as script_id',
                's.user_text as user_text',
                's.ia_text as ia_text'
            )
            .where('p.user_id', userId);
    }

    static async getProjectById(projectId: number, userId: number){
        return await db('project as p')
        .leftJoin('script as s', 'p.id', 's.project_id')
        .select(
            'p.id as project_id',
                'p.title as project_title',
                'p.user_id as user_id',
                's.id as script_id',
                's.user_text as user_text',
                's.ia_text as ia_text'
        ).where('user_id', userId).where('p.id', projectId).first();
    }

    static async createTag(dataTag: ITagData) {
        await db('tag').insert(dataTag);
        return;
    }

    static async setProjectTag(projectId: number, tagId: number, trx: Knex.Transaction) {
        await db('project_tag').transacting(trx).insert({ project_id: projectId, tag_id: tagId });
        return;
    }
}
