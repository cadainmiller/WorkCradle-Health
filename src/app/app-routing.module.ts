import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./login-register/login-register.module').then(
        (m) => m.LoginRegisterModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['admin'],
    },
    loadChildren: () =>
      import('./dashboard-admin/dashboard-admin.module').then(
        (m) => m.DashboardAdminModule
      ),
  },
  {
    path: 'dietitian',
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['dietitian'],
    },
    loadChildren: () =>
      import('./dashboard-dietician/dashboard-dietician.module').then(
        (m) => m.DashboardDieticianModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
