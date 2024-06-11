import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, InfoRoutingModule, FormsModule],
})
export class InfoModule {}
