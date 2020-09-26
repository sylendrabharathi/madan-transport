import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DriverInOutModule } from './driver-in-out/driver-in-out.module';
import { AuthGuardGuard } from './guards/auth-guard/auth-guard.guard';
import { LoginGuardGuard } from './guards/login-guard/login-guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'booking-enquires',
    loadChildren: () => import('./booking-enquires/booking-enquires.module').then(m => m.BookingEnquiresModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'driver-in-out',
    loadChildren: () => import('./driver-in-out/driver-in-out.module').then(m => m.DriverInOutModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'sign-up', component: SignUpComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'manage-driver',
    loadChildren: () => import('./manage-driver/manage-driver.module').then(m => m.ManageDriverModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'my-bookings',
    loadChildren: () => import('./my-bookings/my-bookings.module').then(m => m.MyBookingsModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'track',
    loadChildren: () => import('./track/track.module').then(m => m.TrackModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'manage-vehicle',
    loadChildren: () => import('./manage-vehicle/manage-vehicle.module').then(m => m.ManageVehicleModule),
    canActivateChild: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
