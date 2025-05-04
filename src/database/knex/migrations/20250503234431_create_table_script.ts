import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('script', (table) => {
        table.bigIncrements('id').unique().index();
        table.string('user_text').notNullable();
        table.jsonb('ia_text').notNullable();

        table.integer('project_id').unsigned().notNullable();
        table.foreign('project_id').references('id').inTable('project');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('script');
}
