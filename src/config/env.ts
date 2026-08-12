import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    client: process.env.DB_CLIENT || 'pg',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || '5432',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'vehicle_rental',
    poolMax: Number(process.env.DB_POOL_MAX) || '10',
    poolMin: Number(process.env.DB_POOL_MIN) || '2',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'testing',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },

  uploadPath: process.env.UPLOAD_PATH || 'uploads/vehicles',
};
