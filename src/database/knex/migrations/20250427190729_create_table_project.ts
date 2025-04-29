import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('project', (table) => {
        table.bigIncrements('id').primary().index();
        table.string('title', 110).notNullable();
        table.timestamp('date_submit', { useTz: true }).defaultTo(knex.fn.now());

        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('user');

        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('project');
}
