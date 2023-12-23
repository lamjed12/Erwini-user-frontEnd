
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Map } from '../model/map';
@Injectable({
  providedIn: 'root'
})
export class mapService {
  apiServerUrl:"http://localhost:8080" | undefined;
  constructor(private http : HttpClient) { }

  public getmap (): Observable<Map[]> {
    return this.http.get<Map[]>("http://localhost:8080/api/maps");
  }

  public addmap(claim: any): Observable<any> {
    return this.http.post<Map>("http://localhost:8080/api/create/map", claim);
  }

 
  public deletemap(claimId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/maps/${claimId}`,);
  }
  
}
