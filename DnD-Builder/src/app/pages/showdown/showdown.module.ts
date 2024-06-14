import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowdownRoutingModule } from './showdown-routing.module';
import { ShowdownComponent } from './showdown.component';
import { StruttureModule } from '../../strutture/strutture.module';

@NgModule({
  declarations: [ShowdownComponent],
  imports: [CommonModule, ShowdownRoutingModule, StruttureModule],
})
export class ShowdownModule {}
