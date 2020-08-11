import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationDetailComponent } from './location-detail/location-detail.component';


const routes: Routes = [
  {
    path: '', component: LocationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
