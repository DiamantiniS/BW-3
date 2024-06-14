import { iPg } from './i-pg';

export interface iUser {
  username: string;
  id: number;
  email: string;
  password?: string;
  pic: string;
  pg: iPg;
}
