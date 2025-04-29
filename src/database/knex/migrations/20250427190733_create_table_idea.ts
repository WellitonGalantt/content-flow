import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('idea', (table) => {
        table.bigIncrements('id').primary().index();
        table.string('idea').notNullable();

        table.integer('project_id').unsigned().notNullable();
        table.foreign('project_id').references('id').inTable('project');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('idea');
}
