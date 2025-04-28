import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex
        .schema
        .createTable('tag', table => {
            table.bigIncrements('id').primary().index();
            table.string('color').notNullable();
            table.string('tag_name', 12).notNullable();

            table.integer('project_id').unsigned().notNullable();
            table.foreign('project_id').references('id').inTable('project');

            table.timestamp('created_at', { useTz: true });
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tag');
}

