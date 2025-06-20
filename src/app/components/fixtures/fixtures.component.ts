import { Component, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { formatDate } from '@angular/common';

import { CricketService } from '../../services/cricket.service';


@Component({
  selector: 'app-fixtures',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './fixtures.component.html'

})

export class FixturesComponent {
  private http = inject(HttpClient);

  loading = signal(true);
  matchType = signal<'t20' | 'odi' | 'test'>('t20');
  fixtures = signal<any[]>([]);
  groupedFixtures = signal<Map<string, any[]>>(new Map());

  fixtureDates = computed(() => Array.from(this.groupedFixtures().keys()));

  constructor() {
    this.fetchFixtures();
  }

  setMatchType(type: string) {
    this.matchType.set(type as 't20' | 'odi' | 'test');
    this.fetchFixtures();
  }

  fetchFixtures() {
    this.loading.set(true);
    const url = `https://api.cricapi.com/v1/currentMatches?apikey=93e708db-e577-449e-a3d4-5be7958c6796&offset=0`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        const selectedType = this.matchType();
        const matches = (res?.data || []).filter((match: any) => {
          return match.matchType === selectedType && !match.matchEnded;
        });

        // Group by date
        const groupMap = new Map<string, any[]>();
        matches.forEach((match: any) => {
          const date = formatDate(match.date, 'fullDate', 'en-US');
          if (!groupMap.has(date)) {
            groupMap.set(date, []);
          }
          groupMap.get(date)?.push(match);
        });

        this.groupedFixtures.set(groupMap);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to fetch fixtures', err);
        this.loading.set(false);
      }
    });
  }
}