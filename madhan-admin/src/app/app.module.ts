import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VehicleDetailsModule } from './vehicle-details/vehicle-details.module';
import { LrModule } from './lr/lr.module';
import { RateCardModule } from './rate-card/rate-card.module';
import { ReportsModule } from './reports/reports.module';
import { LocationModule } from './location/location.module';
import { EmployeeModule } from './employee/employee.module';
import { OrgModule } from './org/org.module';
import { ReferenceModule } from './reference/reference.module';
import { BookingReciptPageModule } from './booking-recipt/booking-recipt.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    VehicleDetailsModule,
    LrModule,
    RateCardModule,
    ReportsModule,
    LocationModule,
    EmployeeModule,
    OrgModule,
    ReferenceModule,
    BookingReciptPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
