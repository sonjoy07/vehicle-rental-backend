import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('vehicles').del();

  // Inserts seed entries
  await knex('vehicles').insert([
    {
      name: 'Toyota Axio',
      plate_number: 'DHA-1234',
      category: 'sedan',
      daily_rate: 1500,
    },
    {
      name: 'Honda CR-V',
      plate_number: 'DHA-5678',
      category: 'suv',
      daily_rate: 3000,
    },
    {
      name: 'Yamaha FZS',
      plate_number: 'DHA-9012',
      category: 'motorcycle',
      daily_rate: 500,
    },
  ]);
}
