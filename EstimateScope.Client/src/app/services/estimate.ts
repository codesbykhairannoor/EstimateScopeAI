import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EstimateService {
  // Ganti URL sesuai port backend lu
  private apiUrl = 'http://localhost:5062/api/estimate/analyze'; 

  constructor(private http: HttpClient) {}

  // Function terima object lengkap, bukan string doang
  analyzeProject(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}