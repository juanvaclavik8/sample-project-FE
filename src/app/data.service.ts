import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://localhost:7152/Sensx';

  constructor(private http: HttpClient) {}

  pingActive(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  sendData(data: string): Observable<any> {
    return this.http.post(this.apiUrl, null, { params: { data: data } });
  }
}
