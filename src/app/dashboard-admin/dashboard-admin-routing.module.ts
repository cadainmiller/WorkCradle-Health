import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateViewComponent } from './admin-create-view/admin-create-view.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CompanyComponent } from './company/company.component';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { DietPlanUploadComponent } from './diet-plan-upload/diet-plan-upload.component';
import { DietitiansCreateComponent } from './dietitians-create/dietitians-create.component';
import { DietitiansViewComponent } from './dietitians-view/dietitians-view.component';
import { DietitiansComponent } from './dietitians/dietitians.component';
import { DocumentsComponent } from './documents/documents.component';
import { IntakeFormCreateComponent } from './intake-form-create/intake-form-create.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardAdminComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'dietitians', component: DietitiansComponent },
      {
        path: 'dietitians/create',
        component: DietitiansCreateComponent,
      },
      {
        path: 'dietitians/view/:id',
        component: DietitiansViewComponent,
      },
      { path: 'patient', component: PatientComponent },
      {
        path: 'patient/create',
        component: PatientCreateComponent,
      },
      {
        path: 'patient/view/:id',
        component: PatientViewComponent,
      },
      { path: 'diet/upload', component: DietPlanUploadComponent },
      { path: 'appointment', component: AppointmentsComponent },
      {
        path: 'intakeform/create',
        component: IntakeFormCreateComponent,
      },
      { path: 'document', component: DocumentsComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'admins/view', component: AdminCreateViewComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdminRoutingModule {}
