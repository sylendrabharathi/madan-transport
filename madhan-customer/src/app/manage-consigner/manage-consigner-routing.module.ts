import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsignerListComponent } from './consigner-list/consigner-list.component';
import { ConsignerCreateComponent } from './consigner-create/consigner-create.component';


const routes: Routes = [
  {
    path: '', component: ConsignerListComponent
  },
  {
    path: 'new', component: ConsignerCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageConsignerRoutingModule { }
