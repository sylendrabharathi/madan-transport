import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsListComponent } from './details-list/details-list.component';


const routes: Routes = [
  {
    path: '', 
    component: DetailsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleDetailsRoutingModule { }
