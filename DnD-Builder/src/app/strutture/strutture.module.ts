import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePgComponent } from './single-pg/single-pg.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SinglePgComponent],
  imports: [CommonModule, RouterModule],
  exports: [SinglePgComponent],
})
export class StruttureModule {}
