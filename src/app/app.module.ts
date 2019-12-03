import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleItemComponent } from './vehicle/vehicle-list/vehicle-item/vehicle-item.component';
import { VehicleService } from './vehicle/vehicle.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { VehicleDetailsComponent } from './vehicle/vehicle-details/vehicle-details.component';
import { VehicleStartComponent } from './vehicle/vehicle-start/vehicle-start.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ChangesGuardServices} from './vehicle/changes-guard.services';
import { SignupComponent } from './signup/signup.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VehicleComponent,
    VehicleListComponent,
    VehicleItemComponent,
    LoginComponent,
    VehicleDetailsComponent,
    VehicleStartComponent,
    VehicleEditComponent,
    FooterComponent,
    SignupComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [VehicleService, ChangesGuardServices],
  bootstrap: [AppComponent]
})
export class AppModule {}
