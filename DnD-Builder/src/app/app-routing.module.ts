import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { GuestGuard } from './auth/guard/guest.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Dashboard',
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./pages/builder/builder.module').then((m) => m.BuilderModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Builder',
  },
  {
    path: 'favourites',
    loadChildren: () =>
      import('./pages/favourites/favourites.module').then(
        (m) => m.FavouritesModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Preferiti',
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Profile',
  },
  { // ROTTA INUTILIZZATA
    path: 'info',
    loadChildren: () =>
      import('./pages/info/info.module').then((m) => m.InfoModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Info',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
    title: 'Accedi',
  },
  {
    path: 'showdown',
    loadChildren: () =>
      import('./pages/showdown/showdown.module').then((m) => m.ShowdownModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Showdown',
  },
  {
    path: 'match',
    loadChildren: () =>
      import('./pages/showdown/match/match.module').then((m) => m.MatchModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Match',
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./pages/info/info.module').then((m) => m.InfoModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    title: 'Dettaglio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
