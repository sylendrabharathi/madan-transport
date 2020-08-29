import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { BookingComponent } from './booking/booking.component';


const routes: Routes = [
  { path: '', component: MyBookingsComponent },
  { path: 'booking/:bookingId', component: BookingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBookingsRoutingModule { }
