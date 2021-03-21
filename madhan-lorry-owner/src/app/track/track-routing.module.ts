import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackingComponent } from './tracking/tracking.component';


const routes: Routes = [
  {
    path: '', component: TrackingComponent,
  }, {
    path: 'track/:vehicleId', component: TrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackRoutingModule { }
