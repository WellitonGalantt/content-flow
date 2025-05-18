import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    // Aqui só adiciona a coluna user_id na tabela 'tag'
    return knex.schema.alterTable('tag', (table) => {
        table.bigInteger('user_id').unsigned().index().notNullable();
        table.foreign('user_id').references('id').inTable('users');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tag', (table) => {
        table.dropColumn('user_id');
    });
}
