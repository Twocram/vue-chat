import crypto from 'crypto';
import { promisify } from 'util';

export async function generateHash(value: string): Promise<Buffer> {
  return promisify(crypto.scrypt)(value, 'salt', 64) as Promise<Buffer>;
}
