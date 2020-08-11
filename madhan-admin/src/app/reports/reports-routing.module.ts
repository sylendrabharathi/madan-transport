import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsDetailComponent } from './reports-detail/reports-detail.component';


const routes: Routes = [
  {
    path: '', component: ReportsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
