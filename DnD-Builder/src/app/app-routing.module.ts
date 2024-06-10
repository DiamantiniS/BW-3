import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }, { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) }, { path: 'builder', loadChildren: () => import('./pages/builder/builder.module').then(m => m.BuilderModule) }, { path: 'favourites', loadChildren: () => import('./pages/favourites/favourites.module').then(m => m.FavouritesModule) }, { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) }, { path: 'info', loadChildren: () => import('./pages/info/info.module').then(m => m.InfoModule) }, { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
