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

  // getUpcomingFixtures(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/matches?apikey=${this.apiKey}`);
  // }

  getMatchResults(): Observable<any> {
  const body = {
    apikey: '93e708db-e577-449e-a3d4-5be7958c6796', 
    offset: 0
  };
  return this.http.post<any>('https://api.cricapi.com/v1/currentMatches', body);
}

getMatchInfo(id: string): Observable<any> {
  const url = `https://api.cricapi.com/v1/match_info?apikey=93e708db-e577-449e-a3d4-5be7958c6796&id=${id}`;
  return this.http.get<any>(url);
}

getUpcomingFixtures(): Observable<any> {
  const url = `https://api.cricapi.com/v1/matches?apikey=93e708db-e577-449e-a3d4-5be7958c6796`;
  return this.http.get<any>(url);
}

searchPlayers(keyword: string): Observable<any> {
  const url = `https://api.cricapi.com/v1/players_search?apikey=93e708db-e577-449e-a3d4-5be7958c6796&search=${keyword}`;
  return this.http.get<any>(url);
}

getPlayerInfo(id: string): Observable<any> {
  const url = `https://api.cricapi.com/v1/players_info?apikey=93e708db-e577-449e-a3d4-5be7958c6796&id=${id}`;
  return this.http.get<any>(url);
}
}
