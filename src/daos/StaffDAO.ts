import { BaseDAO } from "./BaseDAO";
import { Staff } from "../types/auth.types";

export class StaffDAO extends BaseDAO<Staff> {
    protected tableName = 'staff';

    async getDataByEmail(email: string): Promise<Staff | undefined> {
        return this.db(this.tableName).where({ email }).first();
    }

    async create(payload: Partial<Staff>): Promise<Staff> {
        const [staff] = await this.db(this.tableName).insert(payload).returning('*');
        return staff;
    }
}