import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingEnquiresRoutingModule } from './booking-enquires-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingEnquiresComponent } from './booking-enquires/booking-enquires.component';
import { BookingEnquiresApiService } from './services/api/booking-enquires-api.service';


@NgModule({
  declarations: [
    BookingEnquiresComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BookingEnquiresRoutingModule
  ],
  providers: [
    BookingEnquiresApiService
  ]
  
})
export class BookingEnquiresModule { }
