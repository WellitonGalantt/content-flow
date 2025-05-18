import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tag', (table) => {
        table.bigIncrements('id').primary().index();
        table.string('color').notNullable().defaultTo('#f7f7f7');
        table.string('tag_name', 12).notNullable().unique();

        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tag');
}
