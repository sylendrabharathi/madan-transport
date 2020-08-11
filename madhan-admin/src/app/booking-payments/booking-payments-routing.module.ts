import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { NewPaymentsComponent } from './new-payments/new-payments.component';


const routes: Routes = [
  { path: '', component: PaymentsListComponent },
  { path: 'new', component: NewPaymentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingPaymentsRoutingModule { }
