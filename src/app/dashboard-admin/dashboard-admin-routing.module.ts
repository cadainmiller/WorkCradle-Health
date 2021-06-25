import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { DietPlanUploadComponent } from './diet-plan-upload/diet-plan-upload.component';
import { DietitiansCreateComponent } from './dietitians-create/dietitians-create.component';
import { DietitiansComponent } from './dietitians/dietitians.component';
import { DocumentsComponent } from './documents/documents.component';
import { IntakeFormCreateComponent } from './intake-form-create/intake-form-create.component';
import { MainComponent } from './main/main.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { PatientComponent } from './patient/patient.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardAdminComponent,
    children: [
      { path: ':id', component: MainComponent },
      { path: 'dietitians/:companyCode', component: DietitiansComponent },
      {
        path: 'dietitians/create/:companyCode',
        component: DietitiansCreateComponent,
      },
      { path: 'patient/:companyCode', component: PatientComponent },
      {
        path: 'patient/create/:companyCode',
        component: PatientCreateComponent,
      },
      { path: 'diet/upload/:companyCode', component: DietPlanUploadComponent },
      { path: 'appointment/:companyCode', component: AppointmentsComponent },
      {
        path: 'intakeform/create/:companyCode',
        component: IntakeFormCreateComponent,
      },
      { path: 'document/:companyCode', component: DocumentsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdminRoutingModule {}
