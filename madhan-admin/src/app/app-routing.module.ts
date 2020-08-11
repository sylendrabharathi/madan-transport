import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'vehicle-details',
    loadChildren: () => import('./vehicle-details/vehicle-details.module').then(m => m.VehicleDetailsModule)
  },
  {
    path: 'lr',
    loadChildren: () => import('./lr/lr.module').then(m => m.LrModule)
  },
  {
    path: 'rate-card',
    loadChildren: () => import('./rate-card/rate-card.module').then(m => m.RateCardModule)
  },
  {
    path: 'org',
    loadChildren: () => import('./org/org.module').then(m => m.OrgModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'reference',
    loadChildren: () => import('./reference/reference.module').then(m => m.ReferenceModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'booking-receipt',
    loadChildren: () => import('./booking-recipt/booking-recipt.module').then(m => m.BookingReciptPageModule)
  },
  {
    path: 'booking-payments',
    loadChildren: () => import('./booking-payments/booking-payments.module').then(m => m.BookingPaymentsModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
