import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageVehicleListComponent } from './manage-vehicle-list/manage-vehicle-list.component';
import { ManageVehicleCreateComponent } from './manage-vehicle-create/manage-vehicle-create.component';


const routes: Routes = [
  {
    path: '', component: ManageVehicleListComponent
  },
  {
    path: 'create', component: ManageVehicleCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageVehicleRoutingModule { }
