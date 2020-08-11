import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateCardFormComponent } from './rate-card-form/rate-card-form.component';
import { RateCardListComponent } from './rate-card-list/rate-card-list.component';


const routes: Routes = [
  { path: '', component: RateCardListComponent },
  { path: 'new', component: RateCardFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateCardRoutingModule { }
