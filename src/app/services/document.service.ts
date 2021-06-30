import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private httpClient: HttpClient) {}

  createDocument(body: FormData): Observable<any> {
    return this.httpClient.post(
      `${environment.apiUrl}Document/CreateDocument/`,
      body
    );
  }
  acceptDocument(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Document/GetAllDocuments`,
      {
        headers: headers,
      }
    );
  }
  getDocumentByCompanyCode(companyCode): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Document/GetDocumentByCompanyCode/${companyCode}`,
      {
        headers: headers,
      }
    );
  }
  getDocumentAdmin(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Document/GetDocumentAdmin/`,
      {
        headers: headers,
      }
    );
  }

  getDocumentById(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Document/GetDocumentById/${id}`,
      {
        headers: headers,
      }
    );
  }
  getDocumentByCompanyCodeAndID(companyCode, id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Document/GetDocumentByCompanyCodeAndID/${companyCode}/${id}`,
      {
        headers: headers,
      }
    );
  }
  getDocumentByCreatedById(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Document/GetDocumentByCreatedById/${id}`,
      {
        headers: headers,
      }
    );
  }
  getDocumentByCreatedByIdAndCreatedForId(id, id1): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Document/GetDocumentByCreatedByIdAndCreatedForId/${id}/${id1}`,
      {
        headers: headers,
      }
    );
  }
  getDocumentByCreatedForId(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.get(
      `${environment.apiUrl}Document/GetDocumentByCreatedForId/${id}`,
      {
        headers: headers,
      }
    );
  }
  updateDocument(id, body): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.patch(
      `${environment.apiUrl}Document/UpdateDocument/${id}`,
      body,
      {
        headers: headers,
      }
    );
  }
  deleteDocument(id): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.delete(
      `${environment.apiUrl}Document/DeleteDocumentById/${id}`,
      {
        headers: headers,
      }
    );
  }
}
