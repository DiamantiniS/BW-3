import { iMossa } from './i-mossa';
import { NgModule } from '@angular/core';
export interface iClasse {
  id: number;
  name: string;
  cA: number;
  pf: number;
  mosseId: number[];
  mosse?: iMossa[]
}
