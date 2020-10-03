import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LrDetailComponent } from './lr-detail/lr-detail.component';
import { LrListComponent } from './lr-list/lr-list.component';


const routes: Routes = [
  { path: '', component: LrListComponent },
  { path: 'new', component: LrDetailComponent },
  { path: 'edit/:bookingId', component: LrDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LrRoutingModule { }
