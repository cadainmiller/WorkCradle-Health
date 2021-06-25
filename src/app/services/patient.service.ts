import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  createPatient(body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(
      `${environment.apiUrl}Patient/CreatePatient`,
      body,
      {
        headers: headers,
      }
    );
  }
  getPatients(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Patient/GetPatients`,

      {
        headers: headers,
      }
    );
  }
  getPatientByCompanyCode(companyCode): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Patient/GetPatientByCompanyCode/${companyCode}`,
      {
        headers: headers,
      }
    );
  }
  getPatientByCompanyCodeOnly(companyCode): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Patient/GetPatientByCompanyCodeOnly/${companyCode}`,
      {
        headers: headers,
      }
    );
  }
  getPatientById(patientId): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Patient/GetPatient/${patientId}`,
      {
        headers: headers,
      }
    );
  }

  updatePatient(patientId, body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.patch(
      `${environment.apiUrl}Patient/UpdatePatient/${patientId}`,
      body,
      {
        headers: headers,
      }
    );
  }
  deletePatient(patientId): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.delete(
      `${environment.apiUrl}Patient/DeletePatient/${patientId}`,
      {
        headers: headers,
      }
    );
  }
}
