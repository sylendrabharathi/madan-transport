import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgFormComponent } from './org-form/org-form.component';
import { OrgListComponent } from './org-list/org-list.component';


const routes: Routes = [
  { path: '', component: OrgListComponent },
  { path: 'new', component: OrgFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule { }
