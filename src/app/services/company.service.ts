import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  createCompany(body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(
      `${environment.apiUrl}Company/CreateCompany`,
      body,
      {
        headers: headers,
      }
    );
  }
  getAllCompany(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Company/GetAllCompany`,

      {
        headers: headers,
      }
    );
  }
}
