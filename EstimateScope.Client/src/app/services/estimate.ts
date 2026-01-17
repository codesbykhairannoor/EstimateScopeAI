import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {
  // Cek port ASP.NET lu lagi (tadi 5062 kan?)
  private apiUrl = 'http://localhost:5062/api/estimate/analyze'; 

  constructor(private http: HttpClient) { }

  sendProjectDescription(desc: string): Observable<any> {
    return this.http.post(this.apiUrl, { description: desc });
  }
}