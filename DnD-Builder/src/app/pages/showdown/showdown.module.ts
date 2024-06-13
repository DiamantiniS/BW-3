import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowdownRoutingModule } from './showdown-routing.module';
import { ShowdownComponent } from './showdown.component';


@NgModule({
  declarations: [
    ShowdownComponent
  ],
  imports: [
    CommonModule,
    ShowdownRoutingModule
  ]
})
export class ShowdownModule { }
