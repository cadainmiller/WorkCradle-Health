import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const loginObj = {
      email: body.email,
      password: body.password,
    };
    return this.httpClient.post(`${environment.apiUrl}Auth/login`, loginObj, {
      headers: headers,
    });
  }

  requestPasswordReset(body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(
      `${environment.apiUrl}Auth/RequestPasswordReset`,
      body,
      {
        headers: headers,
      }
    );
  }
}
