import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './services/profile.service';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
