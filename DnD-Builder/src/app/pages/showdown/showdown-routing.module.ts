import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowdownComponent } from './showdown.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  { path: '', component: ShowdownComponent },
  { path: 'match/:id', component: MatchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowdownRoutingModule {}
