import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBookingsRoutingModule } from './my-bookings-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyBookingsApiService } from './services/api/my-bookings-api.service';


@NgModule({
  declarations: [
    MyBookingsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MyBookingsRoutingModule
  ],
  providers: [
    MyBookingsApiService
  ]
})
export class MyBookingsModule { }
