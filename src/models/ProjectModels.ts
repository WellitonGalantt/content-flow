import { Knex } from 'knex';
import { db } from '../database/knex/connection';
import { IUpScriptData, ITagData, IUpProjectData, IUpdateProjectData } from '../shared/types/appTypes';

export class projectModels {
    static async existProject(projectId: number) {
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

    static async getProjectById(projectId: number, userId: number) {
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
            .where('user_id', userId)
            .where('p.id', projectId)
            .first();
    }

    static async updateProject(updateProject: IUpdateProjectData, projectId: number, userId: number) {
        await db('project').update(updateProject).where({ id: projectId, user_id: userId });
    }

    static async deleteProjectById(projectId: number, userId: number, trx: Knex.Transaction): Promise<void> {
        await db('project').transacting(trx).delete().where('id', projectId).where('user_id', userId);
        return;
    }

    static async deleteScriptById(projectId: number, trx: Knex.Transaction): Promise<void> {
        await db('script').transacting(trx).delete('*').where('project_id', projectId);
        return;
    }

    static async createTag(dataTag: ITagData): Promise<Array<{ id: number }>> {
        return await db('tag').insert(dataTag).returning('id');
    }

    static async getOneTag(getData: { tag_name: string } | { id: number }, userId: number): Promise<any> {
        return await db('tag').where(getData).where('user_id', userId).returning('id');
    }

    static async getAllTags(userId: number): Promise<Array<any>> {
        return await db('tag').where('user_id', userId).returning('*');
    }

    static async deleteTagById(tagId: number): Promise<void> {
        await db('tag').delete().where('id', tagId);
        return;
    }

    static async setProjectTag(projectId: number, tagId: number, trx: Knex.Transaction) {
        await db('project_tag').transacting(trx).insert({ project_id: projectId, tag_id: tagId });
        return;
    }

    static async deleteProjectTag(projectId: number, trx: Knex.Transaction) {
        await db('project_tag').transacting(trx).delete('*').where('project_id', projectId);
        return;
    }
}
