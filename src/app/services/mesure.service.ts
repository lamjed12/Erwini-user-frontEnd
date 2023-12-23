
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesure } from '../model/mesure';
@Injectable({
  providedIn: 'root'
})
export class MesureService {
  apiServerUrl:"http://localhost:8080" | undefined;
  constructor(private http : HttpClient) { }

  public getmesure(): Observable<Mesure[]> {
    return this.http.get<Mesure[]>("http://localhost:8080/api/mesures");
  }

  public getmesureById(id:any): Observable<Mesure> {
    console.log(id)
    return this.http.get<Mesure>(`http://localhost:8080/api/mesure/${id}`);
  }

  public addmesure(claim: any): Observable<any> {
    return this.http.post<Mesure>("http://localhost:8080/api/create/mesure", claim);
  }

  public updatemesure(claim: Mesure): Observable<Mesure> {
    console.log(claim)
    return this.http.put<Mesure>(`http://localhost:8080/api/mesures/${claim._id}`,claim);
  }
  public deletemesure(claimId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/mesure/${claimId}`,);
  }
  
}
