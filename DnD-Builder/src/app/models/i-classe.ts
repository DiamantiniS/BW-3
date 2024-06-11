import { iMossa } from './i-mossa';
import { NgModule } from '@angular/core';
export interface iClasse {
  id: number;
  name: string;
  cA: number;
  pf: number;
  mosse: number[];
  // mosse?: iMossa[]
}
