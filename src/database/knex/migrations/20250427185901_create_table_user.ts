import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex
    .schema
    .createTable('user', table => { // user é o nome da tabela e table é um builder de tabelas;
        table.bigIncrements('id').primary().index();
        table.string('name', 60).notNullable().index();
        table.string('email').notNullable();
        table.string('password').notNullable();

        table.timestamp('created_at', { useTz: true}).defaultTo(knex.fn.now()); // Formato de data que se da bem com todas a bibliotecas de datas
        table.timestamp('update_at', { useTz: true}).defaultTo(knex.fn.now());; // Defindo u foramto UTC e colocando valor padrao ao criar
    })  
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user');
}

