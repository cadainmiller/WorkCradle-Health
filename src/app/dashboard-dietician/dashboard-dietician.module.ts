import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDieticianRoutingModule } from './dashboard-dietician-routing.module';
import { MainComponent } from './main/main.component';
import { PatientComponent } from './patient/patient.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { ProfileComponent } from './profile/profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DocumentsComponent } from './documents/documents.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    PatientComponent,
    PatientViewComponent,
    PatientCreateComponent,
    ProfileComponent,
    AppointmentsComponent,
    DocumentsComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    DashboardDieticianRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
    ChartsModule,
    BsDatepickerModule.forRoot(),
  ],
})
export class DashboardDieticianModule {}
