import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info.component';
import { BuilderComponent } from '../builder/builder.component';

const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: 'builder/:id', component: BuilderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoRoutingModule {}
