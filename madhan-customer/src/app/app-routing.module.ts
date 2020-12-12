import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'my-bookings',
    loadChildren: () => import('./my-bookings/my-bookings.module').then(m => m.MyBookingsModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'manage-consigner',
    loadChildren: () => import('./manage-consigner/manage-consigner.module').then(m => m.ManageConsignerModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'manage-pol-pod',
    loadChildren: () => import('./manage-pol-pod/manage-pol-pod.module').then(m => m.ManagePolPodModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'new-booking',
    loadChildren: () => import('./new-booking/new-booking.module').then(m => m.NewBookingModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'new-booking/:id',
    loadChildren: () => import('./new-booking/new-booking.module').then(m => m.NewBookingModule),
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
