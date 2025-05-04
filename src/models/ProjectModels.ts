import { Knex } from 'knex';
import { db } from '../database/knex/connection';
import { IUpScriptData, ITagData, IUpProjectData } from '../shared/types/appTypes';

export class projectModels {
    static async createProject(projectObj: IUpProjectData, trx: Knex.Transaction): Promise<number | void> {
        const [result] = await db('project').transacting(trx).insert(projectObj).returning('id');
        return result.id;
    }
    static async createScript(scriptObj: IUpScriptData, trx: Knex.Transaction): Promise<void> {
        await db('script').transacting(trx).insert(scriptObj);
        return;
    }

    static async getAllProject() {}

    static async createTag(dataTag: ITagData) {
        await db('tag').insert(dataTag);
        return;
    }

    static async setProjectTag(projectId: number, tagId: number, trx: Knex.Transaction) {
        await db('project_tag').transacting(trx).insert({ project_id: projectId, tag_id: tagId });
        return;
    }
}
