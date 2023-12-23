import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { historique } from '../model/historique';
import { HistoriqueForAdmin } from '../model/historiqueForAdmin';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  apiServerUrl:"http://localhost:8080" | undefined;
  constructor(private http : HttpClient) { }

  public gethistorique(): Observable<historique[]> {
    return this.http.get<historique[]>("http://localhost:8080/api/historiques");
  }

  public addhistorique(claim: any): Observable<any> {
    return this.http.post<historique>("http://localhost:8080/api/create/historique", claim);
  }

  public addhistoriqueForAdmin(claim: any): Observable<any> {
    return this.http.post<HistoriqueForAdmin>("http://localhost:8080/api/create/historiqueForAdmin", claim);
  }

  public updatehistorique(claim: historique): Observable<historique> {
    console.log(claim)
    return this.http.put<historique>(`http://localhost:8080/api/historique/${claim._id} `,claim);
  }
  public deletehistorique(claimId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/historique/${claimId}`,);
  }
}
