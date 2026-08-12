import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('rentals').del();

  // Inserts seed entries
  const vehicles = await knex('vehicles').select('id', 'name', 'daily_rate');
  const axio = vehicles.find((v) => v.name === 'Toyota Axio');
  const crv = vehicles.find((v) => v.name === 'Honda CR-V');
  const fzs = vehicles.find((v) => v.name === 'Yamaha FZS');

  if (!axio || !crv || !fzs) {
    throw new Error('Vehicles not found - run vehicle seed first');
  }

  await knex('rentals').insert([
    {
      vehicle_id: axio.id,
      customer_name: 'Rahim Uddin',
      customer_phone: '01711111111',
      start_date: '2026-07-29',
      end_date: '2026-08-03',
      total_amount: 6 * Number(axio.daily_rate), // 6 total days
      status: 'completed',
    },

    {
      vehicle_id: crv.id,
      customer_name: 'Karim Hossain',
      customer_phone: '01722222222',
      start_date: '2026-08-05',
      end_date: '2026-08-10',
      total_amount: 6 * Number(crv.daily_rate),
      status: 'completed',
    },

    {
      vehicle_id: crv.id,
      customer_name: 'Salma Begum',
      customer_phone: '01733333333',
      start_date: '2026-08-15',
      end_date: '2026-08-18',
      total_amount: 4 * Number(crv.daily_rate),
      status: 'booked',
    },

    {
      vehicle_id: fzs.id,
      customer_name: 'Jamal Khan',
      customer_phone: '01744444444',
      start_date: '2026-08-10',
      end_date: '2026-08-12',
      total_amount: 3 * Number(fzs.daily_rate),
      status: 'ongoing',
    },

    {
      vehicle_id: axio.id,
      customer_name: 'Nasrin Akter',
      customer_phone: '01755555555',
      start_date: '2026-08-20',
      end_date: '2026-08-22',
      total_amount: 3 * Number(axio.daily_rate),
      status: 'cancelled',
    },
  ]);
}
