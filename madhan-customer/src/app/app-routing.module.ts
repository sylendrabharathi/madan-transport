import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'my-bookings',
    loadChildren: () => import('./my-bookings/my-bookings.module').then(m => m.MyBookingsModule)
  },
  {
    path: 'manage-consigner',
    loadChildren: () => import('./manage-consigner/manage-consigner.module').then(m => m.ManageConsignerModule)
  },
  {
    path: 'manage-pol-pod',
    loadChildren: () => import('./manage-pol-pod/manage-pol-pod.module').then(m => m.ManagePolPodModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'my-profile',
    loadChildren:() => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'new-booking',
    loadChildren: () => import('./new-booking/new-booking.module').then(m => m.NewBookingModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
