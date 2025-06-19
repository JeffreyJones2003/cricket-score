import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CricketService {
  private apiKey = '93e708db-e577-449e-a3d4-5be7958c6796'; 
  private baseUrl = 'https://api.cricapi.com/v1';

  constructor(private http: HttpClient) {}

  getLiveScores(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/currentMatches?apikey=${this.apiKey}&offset=0`);
  }

  getUpcomingFixtures(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/matches?apikey=${this.apiKey}`);
  }
}