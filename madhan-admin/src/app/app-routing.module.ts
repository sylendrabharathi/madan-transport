import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard/auth-guard.guard';
import { LoginGuardGuard } from './guards/login-guard/login-guard.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivateChild: [AuthGuardGuard]
  },

  {
    path: 'vehicle-details',
    loadChildren: () => import('./vehicle-details/vehicle-details.module').then(m => m.VehicleDetailsModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'lr',
    loadChildren: () => import('./lr/lr.module').then(m => m.LrModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'rate-card',
    loadChildren: () => import('./rate-card/rate-card.module').then(m => m.RateCardModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'org',
    loadChildren: () => import('./org/org.module').then(m => m.OrgModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    canActivateChild: [AuthGuardGuard]

  },
  {
    path: 'reference',
    loadChildren: () => import('./reference/reference.module').then(m => m.ReferenceModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'report',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'booking-receipt',
    loadChildren: () => import('./booking-recipt/booking-recipt.module').then(m => m.BookingReciptPageModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'booking-payments',
    loadChildren: () => import('./booking-payments/booking-payments.module').then(m => m.BookingPaymentsModule),
    canActivateChild: [AuthGuardGuard]
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule),
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
