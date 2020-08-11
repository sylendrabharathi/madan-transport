import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBookingsRoutingModule } from './my-bookings-routing.module';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';


@NgModule({
  declarations: [
    MyBookingsComponent
  ],
  imports: [
    CommonModule,
    MyBookingsRoutingModule
  ]
})
export class MyBookingsModule { }
