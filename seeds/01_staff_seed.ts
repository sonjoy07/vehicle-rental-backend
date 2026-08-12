import type { Knex } from 'knex';
import { hashPassword } from '../src/utils/password';

export async function seed(knex: Knex): Promise<void> {
  await knex('staff').del();
  const hashed = await hashPassword('password123');
  await knex('staff').insert([
    {
      name: 'Admin User',
      email: 'admin@rental.com',
      password_hash: hashed,
    },
  ]);
}
