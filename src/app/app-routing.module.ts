import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {VehicleComponent} from './vehicle/vehicle.component';
import {VehicleStartComponent} from './vehicle/vehicle-start/vehicle-start.component';
import {VehicleDetailsComponent} from './vehicle/vehicle-details/vehicle-details.component';
import {VehicleEditComponent} from './vehicle/vehicle-edit/vehicle-edit.component';
import {VehicleResolver} from './vehicle/vehicle-resolver';
import {ChangesGuardServices} from './vehicle/changes-guard.services';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from './auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: VehicleStartComponent },
      { path: 'new', component: VehicleEditComponent},
      { path: ':id',
        component: VehicleDetailsComponent,
        resolve: [VehicleResolver]
      },
      { path: ':id/edit', component: VehicleEditComponent, canDeactivate: [ChangesGuardServices]}
    ]},
  { path: 'signup' , component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
