import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingReciptPage } from './booking-recipt.page';
import { NewReceiptComponent } from './new-receipt/new-receipt.component';

const routes: Routes = [
  { path: '', component: BookingReciptPage, },
  { path: 'new', component: NewReceiptComponent },
  { path: 'edit/:reciptId', component: NewReceiptComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingReciptPageRoutingModule { }
