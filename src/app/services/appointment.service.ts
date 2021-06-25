import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) {}

  createAppointment(body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(
      `${environment.apiUrl}Appointment/CreateAppointment/`,
      body,
      {
        headers: headers,
      }
    );
  }
  acceptAppointment(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Appointment/AcceptAppointment/${id}`,
      {
        headers: headers,
      }
    );
  }
  getAppointmentByCompanyCode(companyCode): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Appointment/GetAppointmentByCompanyCode/${companyCode}`,
      {
        headers: headers,
      }
    );
  }
  getAllAppointments(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Appointment/GetAllAppointments`,
      {
        headers: headers,
      }
    );
  }
  getAppointmentById(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Appointment/GetAppointmentById/${id}`,
      {
        headers: headers,
      }
    );
  }
  updateAppointment(id, body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.patch(
      `${environment.apiUrl}Appointment/UpdateAppointment/${id}`,
      body,
      {
        headers: headers,
      }
    );
  }
  deleteAppointment(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.delete(
      `${environment.apiUrl}Appointment/DeleteAppointment/${id}`,
      {
        headers: headers,
      }
    );
  }
}
