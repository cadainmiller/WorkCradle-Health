import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DietitianService {
  constructor(private httpClient: HttpClient) {}

  createDietitian(body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(
      `${environment.apiUrl}Users/CreateUser/`,
      body,
      {
        headers: headers,
      }
    );
  }

  getDietitianByCompanyCode(companyCode): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Users/GetDietitianByCompanyCode/${companyCode}`,
      {
        headers: headers,
      }
    );
  }
  getDietitianByCompanyCodeOnly(companyCode): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Users/GetDietitianByCompanyCodeOnly/${companyCode}`,
      {
        headers: headers,
      }
    );
  }
  getPatientByDietitianId(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Users/GetPatientByDietitianId/${id}`,
      {
        headers: headers,
      }
    );
  }
  getAdminAllOnly(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(`${environment.apiUrl}Users/GetAdminAllOnly/`, {
      headers: headers,
    });
  }
  getDietitianAllOnly(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Users/GetDietitianAllOnly/`,
      {
        headers: headers,
      }
    );
  }
  getDietitianById(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(`${environment.apiUrl}Users/getUserById/${id}`, {
      headers: headers,
    });
  }
  updateDietitianById(id, body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.patch(
      `${environment.apiUrl}Users/UpdateUser/${id}`,
      body,
      {
        headers: headers,
      }
    );
  }
}
