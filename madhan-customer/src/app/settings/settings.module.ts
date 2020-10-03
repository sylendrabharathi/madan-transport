import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
