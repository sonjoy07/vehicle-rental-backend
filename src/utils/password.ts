import bcrypt from 'bcrypt';

const salt = 10;
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, salt);
}
export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
