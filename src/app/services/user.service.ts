import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiServerUrl:"http://localhost:8080" | undefined;
  private userId!
  : string;
  private userIdKey = 'userId';

  constructor(private http : HttpClient) { }

  public getformation(): Observable<user[]> {
    return this.http.get<user[]>("http://localhost:8080/api/users");
  }

  public addformation(claim: any): Observable<any> {
    return this.http.post<user>("http://localhost:8080/api/create", claim);
  }

  public updateformation(claim: user): Observable<user> {
    console.log(claim)
    return this.http.put<user>(`http://localhost:8080/api/user/${claim._id} `,claim);
  }
  public deleteformation(claimId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/user/${claimId}`,);
  }

  setUserId(userId: string): void {
    console.log(userId)
    localStorage.setItem(this.userIdKey, userId);

   // this.userId = userId;
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }
  clearUserId(): void {
    localStorage.removeItem(this.userIdKey);
  }
}
