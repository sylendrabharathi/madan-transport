import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DriverInOutModule } from './driver-in-out/driver-in-out.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'booking-enquires',
    loadChildren: () => import('./booking-enquires/booking-enquires.module').then(m => m.BookingEnquiresModule)
  },
  {
    path: 'driver-in-out',
    loadChildren: () => import('./driver-in-out/driver-in-out.module').then(m => m.DriverInOutModule)
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'manage-driver',
    loadChildren: () => import('./manage-driver/manage-driver.module').then(m => m.ManageDriverModule)
  },
  {
    path: 'my-bookings',
    loadChildren: () => import('./my-bookings/my-bookings.module').then(m => m.MyBookingsModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'track',
    loadChildren: () => import('./track/track.module').then(m => m.TrackModule)
  },
  {
    path: 'manage-vehicle',
    loadChildren: () => import('./manage-vehicle/manage-vehicle.module').then(m => m.ManageVehicleModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
