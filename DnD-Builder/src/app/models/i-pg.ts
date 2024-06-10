import { iClasse } from './i-classe';

export interface iPg {
  id: number;
  name: string;
  img: string;
  classe: iClasse;
  forza: number;
  dext: number;
  int: number;
  cos: number;
}