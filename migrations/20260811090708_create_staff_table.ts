import type { Knex } from "knex";

const tableName = 'staff'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('password_hash').notNullable();
            table.timestamps(true, true)

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(tableName)
}

