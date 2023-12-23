
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { zone } from '../model/zone';
@Injectable({
  providedIn: 'root'
})
export class zoneService {
  apiServerUrl:"http://localhost:8080" | undefined;
  constructor(private http : HttpClient) { }

  public getzone (): Observable<zone[]> {
    return this.http.get<zone[]>("http://localhost:8080/api/zones");
  }

  public addzone(claim: any): Observable<any> {
    return this.http.post<zone>("http://localhost:8080/api/create/zones", claim);
  }

  public updatezone(claim: zone): Observable<zone> {
    console.log(claim)
    return this.http.put<zone>(`http://localhost:8080/api/zones/${claim._id}`,claim);
  }
  public deletezone(claimId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/zones/${claimId}`,);
  }
  
}
