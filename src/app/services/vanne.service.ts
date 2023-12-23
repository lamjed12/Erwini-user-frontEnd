
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vanne } from '../model/vanne';
@Injectable({
  providedIn: 'root'
})
export class vanneService {
  apiServerUrl:"http://localhost:8080" | undefined;
  constructor(private http : HttpClient) { }

  public getvanne (): Observable<vanne[]> {
    return this.http.get<vanne[]>("http://localhost:8080/api/vannes");
  }
  public getVanneByUser(claim: any): Observable<vanne[]> {
    console.log('puit service'+ claim);
    return this.http.get<vanne[]>(`http://localhost:8080/api/vanne/byUser/${claim}`);
  }

  public addvanne(claim: any): Observable<any> {
    return this.http.post<vanne>("http://localhost:8080/api/create/vanne", claim);
  }

  public updatevanne(claim: vanne): Observable<vanne> {
    console.log(claim)
    return this.http.put<vanne>(`http://localhost:8080/api/vanne/${claim._id}`,claim);
  }
  public deletevanne(claimId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/vanne/${claimId}`,);
  }
  
}
