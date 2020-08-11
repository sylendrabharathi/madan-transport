import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingPaymentsRoutingModule } from './booking-payments-routing.module';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { NewPaymentsComponent } from './new-payments/new-payments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    PaymentsListComponent,
    NewPaymentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookingPaymentsRoutingModule
  ]

})
export class BookingPaymentsModule { }
