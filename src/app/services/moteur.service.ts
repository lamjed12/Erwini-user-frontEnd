// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Pompe } from '../model/pompe';


// @Injectable({
//   providedIn: 'root'
// })
// export class PompeService {

//   apiServerUrl:"http://localhost:8080" | undefined;
//   constructor(private http : HttpClient) { }

//   public getpompes(): Observable<Pompe[]> {
//     return this.http.get<Pompe[]>("http://localhost:8080/api/pompes");
//   }

//   public addpompe(claim: any): Observable<any> {
//     return this.http.post<Pompe>("http://localhost:8080/api/create/pompes", claim);
//   }

//   public updatepompe(claim: Pompe): Observable<Pompe> {
//     console.log(claim)
//     return this.http.put<Pompe>(`http://localhost:8080/api/pompes/${claim._id} `,claim);
//   }
//   public deletepompe(claimId: number): Observable<void> {
//     return this.http.delete<void>(`http://localhost:8080/api/pompes/${claimId}`,);
//   }

// }
