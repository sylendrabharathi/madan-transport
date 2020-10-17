import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
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
import { BookingPaymentsModule } from './booking-payments/booking-payments.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { LocalStorageService } from './service/local-storage/local-storage.service';
import { ApiService } from './service/api/api.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,
    // SignUpComponent,
    LoginComponent],
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
    BookingReciptPageModule,
    HttpClientModule,
    BookingPaymentsModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    GoogleMaps,
    ApiService,
    LocalStorageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
