import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DashboardDieticianComponent } from './dashboard-dietician.component';
import { DocumentsComponent } from './documents/documents.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardDieticianComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'patient', component: PatientComponent },
      {
        path: 'patient/create',
        component: PatientCreateComponent,
      },
      {
        path: 'patient/view/:id',
        component: PatientViewComponent,
      },
      // { path: 'diet/upload', component: DietPlanUploadComponent },
      { path: 'appointment', component: AppointmentsComponent },

      { path: 'document', component: DocumentsComponent },

      { path: '**', component: NotFoundComponent },
    ],
  },
  {
    path: '',
    redirectTo: 'dietitian',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDieticianRoutingModule {}
