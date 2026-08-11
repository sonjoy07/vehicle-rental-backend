import type { Knex } from "knex";
import { hashPassword } from "../src/utils/password";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("staff").del();
    const hashed = await hashPassword('password123')

    // Inserts seed entries
    await knex("staff").insert([{
        name: 'Admin User',
        email: 'admin@rental.com',
        password: hashed
    }
    ]);
};
