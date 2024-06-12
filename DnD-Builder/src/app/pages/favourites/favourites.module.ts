import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites.component';
import { StruttureModule } from '../../strutture/strutture.module';

@NgModule({
  declarations: [FavouritesComponent],
  imports: [CommonModule, FavouritesRoutingModule, StruttureModule],
})
export class FavouritesModule {}
