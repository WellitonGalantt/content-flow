import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('telephone', (table) => {
        table.bigIncrements('id').primary().index();
        table.integer('ddd', 2).unsigned().notNullable();
        table.integer('number', 9).unsigned().notNullable();
        table.boolean('notfication').notNullable();
        table.integer('user_id').unsigned().notNullable(); // unsigned nao pode ser negativo
        table.foreign('user_id').references('id').inTable('user'); // reference a coluna de referencia para a chave estrangeira, e inTable de qual tabela;

        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('telephone');
}
