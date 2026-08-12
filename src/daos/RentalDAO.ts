import { BaseDAO } from "./BaseDAO";
import { Rental, RentalFilters } from "../types/rental.types";
import { Knex } from "knex";

const ACTIVE_STATUSES = ['booked', 'ongoing'];
export class RentalDAO extends BaseDAO<Rental> {
    protected tableName = 'rentals';
    async findOverLapping(vehicleId: number, startDate: string, endDate: string, excludeRentalId?: number, trx?: Knex.Transaction) {
        const runner = trx || this.db;

        const query = runner(this.tableName).where('vehicle_id', vehicleId).whereIn('status', ACTIVE_STATUSES).andWhere('start_date', '<=', endDate).andWhere('end_date', '>=', startDate);
        if (excludeRentalId) query.andWhereNot('id', excludeRentalId);
        if (trx) query.forUpdate();
        return query.first();
    }
    async getAllActiveRental(filter: RentalFilters): Promise<{ data: Rental[]; total: number }> {
        const { page = 1, limit = 10, vehicle_id, status, from, to } = filter;
        const baseQuery = this.db(this.tableName).whereNull('deleted_at');

        if (vehicle_id) baseQuery.andWhere('vehicle_id', vehicle_id);
        if (status) baseQuery.andWhere('status', status);
        if (from) baseQuery.andWhere('start_date', '>=', from);
        if (to) baseQuery.andWhere('end_date', '<=', to);
        const countResult = await baseQuery.clone().clearSelect().count('id as count').first();
        const data = await baseQuery.clone().select('*').orderBy('created_at', 'desc').limit(limit).offset((page - 1) * limit)
        return { data, total: Number(countResult?.count || 0) }
    }

    async create(payload: Partial<Rental>, trx?: Knex.Transaction): Promise<Rental> {
        const runner = trx || this.db
        const [rental] = await runner(this.tableName).insert(payload).returning('*');
        return rental;
    }
    async update(id: number, payload: Partial<Rental>, trx?: Knex.Transaction): Promise<Rental | undefined> {
        const runner = trx || this.db
        const [rental] = await runner(this.tableName).where({ id }).update({ ...payload, updated_at: this.db.fn.now() }).returning('*');
        return rental;
    }

    // async softDelete(id: number): Promise<number> {
    //     return this.db(this.tableName).where({ id }).update({ deleted_at: this.db.fn.now() });
    // }
}