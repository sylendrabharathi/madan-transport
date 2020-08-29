import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageDriverListComponent } from './manage-driver-list/manage-driver-list.component';
import { ManageDriverCreateComponent } from './manage-driver-create/manage-driver-create.component';


const routes: Routes = [
  { path: '', component: ManageDriverListComponent },
  { path: 'create', component: ManageDriverCreateComponent },
  { path: 'edit/:driverId', component: ManageDriverCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDriverRoutingModule { }
