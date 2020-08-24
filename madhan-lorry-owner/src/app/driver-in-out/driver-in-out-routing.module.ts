import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverInOutComponent } from './driver-in-out/driver-in-out.component';
import { NewDriverInOutComponent } from './new-driver-in-out/new-driver-in-out.component';


const routes: Routes = [
  { path: '', component: DriverInOutComponent },
  { path: 'create', component: NewDriverInOutComponent },
  { path: ':driverInOutId/edit', component: NewDriverInOutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverInOutRoutingModule { }
