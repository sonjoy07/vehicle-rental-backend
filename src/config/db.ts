import knex from 'knex';
import { env } from './env';

const db = knex({
  client: env.db.client,
  connection: {
    host: env.db.host,
    port: Number(env.db.port),
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
  },

  pool: {
    min: Number(env.db.poolMin),
    max: Number(env.db.poolMax),
  },
});
export default db;
