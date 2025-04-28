import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex
        .schema
        .createTable('projet_tag', table => {
            table.integer('project_id').unsigned().notNullable();
            table.foreign('project_id').references('id').inTable('project');

            table.integer('tag_id').unsigned().notNullable();
            table.foreign('tag_id').references('id').inTable('tag');
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('project_tag');
}

