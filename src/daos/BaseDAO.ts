import { Knex } from 'knex';
import db from '../config/db';

export abstract class BaseDAO<T> {
  protected db: Knex = db;
  protected abstract tableName: string;

  async getDataById(id: number): Promise<T | undefined> {
    return this.db(this.tableName).where({ id }).first();
  }
  async delete(id: number): Promise<number> {
    return this.db(this.tableName).where({ id }).del();
  }
}
