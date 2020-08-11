import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';


const routes: Routes = [
  {
    path: '', component: MyBookingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBookingsRoutingModule { }
