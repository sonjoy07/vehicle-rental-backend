import { BaseDAO } from "./BaseDAO";
import { Vehicle, VehicleFilters } from "../types/vehicle.types";

export class VehicleDAO extends BaseDAO<Vehicle> {
    protected tableName = 'vehicles';

    async getActiveVehicleById(id: number): Promise<Vehicle | undefined> {
        return this.db(this.tableName).where({ id }).whereNull('deleted_at').first();
    }
    async getActiveVehicleByPlateNumber(plate_number: string): Promise<Vehicle | undefined> {
        return this.db(this.tableName).where({ plate_number }).whereNull('deleted_at').first();
    }
    async getAllActiveVehicle(filter: VehicleFilters): Promise<{ data: Vehicle[]; total: number }> {
        const { page = 1, limit = 10, category, search } = filter;
        const baseQuery = this.db(this.tableName).whereNull('deleted_at');

        if (category) baseQuery.andWhere('category', category);
        if (search) baseQuery.andWhere('name', `%${search}%`);
        const countResult = await baseQuery.clone().clearSelect().count('id as count').first();
        const data = await baseQuery.clone().select('*').orderBy('created_at', 'desc').limit(limit).offset((page - 1) * limit)
        return { data, total: Number(countResult?.count || 0) }
        // return this.db(this.tableName).where({ plateNumber }).whereNull('deleted_at').first();
    }

    async create(payload: Partial<Vehicle>): Promise<Vehicle> {
        const [vehicle] = await this.db(this.tableName).insert(payload).returning('*');
        return vehicle;
    }
    async update(id: number, payload: Partial<Vehicle>): Promise<Vehicle | undefined> {
        const [vehicle] = await this.db(this.tableName).where({ id }).update({ ...payload, updated_at: this.db.fn.now() }).returning('*');
        return vehicle;
    }

    async softDelete(id: number): Promise<number> {
        return this.db(this.tableName).where({ id }).update({ deleted_at: this.db.fn.now() });
    }
}