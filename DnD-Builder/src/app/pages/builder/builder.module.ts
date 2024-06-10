import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderComponent } from './builder.component';


@NgModule({
  declarations: [
    BuilderComponent
  ],
  imports: [
    CommonModule,
    BuilderRoutingModule
  ]
})
export class BuilderModule { }
