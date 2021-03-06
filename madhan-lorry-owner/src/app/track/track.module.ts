import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRoutingModule } from './track-routing.module';
import { TrackingComponent } from './tracking/tracking.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackApiService } from './services/api/track-api.service';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TrackingComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TrackRoutingModule,
    TranslateModule
  ],
  providers: [
    TrackApiService
  ]
})
export class TrackModule { }
