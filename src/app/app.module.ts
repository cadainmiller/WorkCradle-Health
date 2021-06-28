import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardAdminModule } from './dashboard-admin/dashboard-admin.module';
import { DashboardDieticianComponent } from './dashboard-dietician/dashboard-dietician.component';
import { DashboardPatientComponent } from './dashboard-patient/dashboard-patient.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LoginRegisterModule } from './login-register/login-register.module';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardAdminComponent,
    DashboardDieticianComponent,
    DashboardPatientComponent,
    LoginRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginRegisterModule,
    DashboardAdminModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
