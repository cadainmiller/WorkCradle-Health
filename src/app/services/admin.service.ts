import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  createUser(body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(`${environment.apiUrl}Users/CreateUser`, body, {
      headers: headers,
    });
  }
  getAdminAllOnly(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Users/GetAdminAllOnly`,

      {
        headers: headers,
      }
    );
  }
  getUserAdminByCompanyCode(companyCode): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Users/GetUserAdminByCompanyCode/${companyCode}`,
      {
        headers: headers,
      }
    );
  }
}
