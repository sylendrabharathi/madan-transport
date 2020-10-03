import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolPodListComponent } from './pol-pod-list/pol-pod-list.component';
import { PolPodCreateComponent } from './pol-pod-create/pol-pod-create.component';


const routes: Routes = [
  {
    path: '', component: PolPodListComponent
  },
  {
    path: ':id/edit', component: PolPodCreateComponent
  },
  {
    path: 'new', component: PolPodCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePolPodRoutingModule { }
