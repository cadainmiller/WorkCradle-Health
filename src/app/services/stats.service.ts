import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private httpClient: HttpClient) {}

  getSuperAdminStats(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Stats/GetSuperAdminStats/`,
      {
        headers: headers,
      }
    );
  }
  getAdminStats(companyCode): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Stats/GetAdminStats/${companyCode}`,
      {
        headers: headers,
      }
    );
  }
  getDietitianStatsByCompanyCodeAndID(companyCode, id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Stats/GetDietitianStatsByCompanyCodeAndID/${companyCode}/${id}`,
      {
        headers: headers,
      }
    );
  }
}
