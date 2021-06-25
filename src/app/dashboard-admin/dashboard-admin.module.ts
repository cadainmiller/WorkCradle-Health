import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DietitiansComponent } from './dietitians/dietitians.component';
import { DietitiansCreateComponent } from './dietitians-create/dietitians-create.component';
import { PatientComponent } from './patient/patient.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { DietPlanUploadComponent } from './diet-plan-upload/diet-plan-upload.component';
import { IntakeFormCreateComponent } from './intake-form-create/intake-form-create.component';
import { DocumentsComponent } from './documents/documents.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { PatientViewComponent } from './patient-view/patient-view.component';

import { DietitiansViewComponent } from './dietitians-view/dietitians-view.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DietitiansComponent,
    DietitiansCreateComponent,
    PatientComponent,
    PatientCreateComponent,
    DietPlanUploadComponent,
    AppointmentsComponent,
    IntakeFormCreateComponent,
    DocumentsComponent,
    MainComponent,
    PatientViewComponent,

    DietitiansViewComponent,
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
  ],
})
export class DashboardAdminModule {}
