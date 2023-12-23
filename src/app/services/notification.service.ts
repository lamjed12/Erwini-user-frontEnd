import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  apiServerUrl:"http://localhost:8080" | undefined;
  constructor(private http : HttpClient) { }

  // getNotifications(): Observable<Notification[]> {
  //   return this.http.get<Notification[]>(this.apiUrl);
  // }
  public getNotifications (): Observable<Notification[]> {
    return this.http.get<Notification[]>("http://localhost:8080/api/notificationsUser");
  }



}
