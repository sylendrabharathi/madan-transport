import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferenceFormComponent } from './reference-form/reference-form.component';
import { ReferenceListComponent } from './reference-list/reference-list.component';


const routes: Routes = [
  { path: '', component: ReferenceListComponent },
  { path: 'new', component: ReferenceFormComponent },
  { path: ':id/:type/edit', component: ReferenceFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenceRoutingModule { }
