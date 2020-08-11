import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { TruckDetailComponent } from './truck-detail/truck-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: ':id/truck-detail',
    component: TruckDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
