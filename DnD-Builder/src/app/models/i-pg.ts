import { iClasse } from './i-classe';

export interface iPg {
  id: number;
  userId: number;
  name: string;
  img: string;
  imgpng?: string;
  classeId: number;
  classe?: iClasse;
  forza: number;
  dext: number;
  int: number;
  cos: number;
}
