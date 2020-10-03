import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBookingsRoutingModule } from './my-bookings-routing.module';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyBookinsApiService } from './service/api/my-bookins-api.service';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    MyBookingsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MyBookingsRoutingModule
  ],
  providers:[
    MyBookinsApiService
  ]
})
export class MyBookingsModule { }
