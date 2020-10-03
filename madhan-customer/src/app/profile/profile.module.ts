import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
