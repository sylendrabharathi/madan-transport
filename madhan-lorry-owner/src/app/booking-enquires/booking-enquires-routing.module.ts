import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingEnquiresComponent } from './booking-enquires/booking-enquires.component';


const routes: Routes = [
  {
    path: '', component: BookingEnquiresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingEnquiresRoutingModule { }
