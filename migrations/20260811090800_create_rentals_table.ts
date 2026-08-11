import type { Knex } from "knex";

const tableName = 'rentals'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary;
        table.integer('vehicle_id').unsigned().notNullable().references('id').inTable('vehicles').onDelete('RESTRICT')
        table.string('customer_name').notNullable();
        table.string('customer_phone').notNullable();
        table.timestamp('start_date').notNullable();
        table.timestamp('end_date').notNullable();
        table.decimal('total_amount', 10, 2).notNullable();
        table.enum('status', ['booked', 'ongoing', 'completed', 'cancelled']).notNullable().defaultTo('booked');
        table.timestamps(true, true);
        table.index(['vehicle_id', 'start_date', 'end_date']);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(tableName)
}

