import { iClasse } from './i-classe';

export interface iPg {
  id: number;
  name: string;
  img: string;
  classeId: number;
  forza: number;
  dext: number;
  int: number;
  cos: number;
  classe?: iClasse
}
