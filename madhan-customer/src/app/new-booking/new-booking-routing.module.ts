import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingCreateComponent } from './booking-create/booking-create.component';


const routes: Routes = [
  {
    path: '',
    component: BookingCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewBookingRoutingModule { }
