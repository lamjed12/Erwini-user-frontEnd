import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agenda } from '../model/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  apiServerUrl:"http://localhost:8080" | undefined;
  constructor(private http : HttpClient) { }

  public getagendas(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>("http://localhost:8080/api/Agendas");
  }
  public getagendasById(id: any): Observable<Agenda> {
    return this.http.get<Agenda>(`http://localhost:8080/api/Agenda/${id}`);
  }


  public getagendasByType(type: any): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`http://localhost:8080/api/Agenda/find/${type}`);
  }

  public addAgenda(claim: any): Observable<any> {
    return this.http.post<Agenda>("http://localhost:8080/api/create/Agenda", claim);
  }

  public updateAgenda(claim: Agenda): Observable<Agenda> {
    console.log(claim)
    return this.http.put<Agenda>(`http://localhost:8080/api/Agenda/${claim._id} `,claim);
  }
  public deleteAgenda(claimId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/Agenda/${claimId}`,);
  }
}
