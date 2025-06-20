import { Component, signal, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-team-stats',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgChartsModule],
  templateUrl: './team-stats.component.html',
})
export class TeamStatsComponent {
  private http = inject(HttpClient);
  loading = signal(true);
  chartType = signal<ChartType>('bar');
  chartData = signal<ChartData<'bar' | 'pie'>>({ labels: [], datasets: [] });
  matchType = signal<string>('t20');
  isBrowser: boolean;

  teamsTable = signal<{
    name: string;
    img: string;
    wins: number;
    total: number;
    winRate: number;
  }[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.fetchStats();
  }

  toggleChartType() {
    this.chartType.set(this.chartType() === 'bar' ? 'pie' : 'bar');
  }

  setMatchType(type: string) {
    this.matchType.set(type);
    this.fetchStats();
  }

  fetchStats() {
    this.loading.set(true);
    const url = 'https://api.cricapi.com/v1/currentMatches?apikey=93e708db-e577-449e-a3d4-5be7958c6796&offset=0';

    const validIntl = [
      'India', 'Australia', 'England', 'Pakistan', 'New Zealand',
      'Sri Lanka', 'South Africa', 'Bangladesh', 'West Indies', 'Afghanistan'
    ];

    this.http.get<any>(url).subscribe({
      next: (res) => {
        const selectedType = this.matchType();
        const teamStats = new Map<string, { wins: number; total: number; img: string }>();

        (res?.data || []).forEach((match: any) => {
          if (match.matchType !== selectedType || !match.matchEnded) return;

          const winner = this.extractWinner(match);

          match.teamInfo?.forEach((team: any) => {
            const name = team.name;
            // if (!validIntl.includes(name)) return;
            const entry = teamStats.get(name) || { wins: 0, total: 0, img: team.img };
            entry.total += 1;
            if (name === winner) entry.wins += 1;
            teamStats.set(name, entry);
          });
        });

        const labels = Array.from(teamStats.keys());
        const data: number[] = [];
        const colors = labels.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`);

        const tableData = labels.map((team) => {
          const stats = teamStats.get(team)!;
          const winRate = stats.total > 0 ? +(stats.wins / stats.total * 100).toFixed(1) : 0;
          data.push(winRate);
          return {
            name: team,
            img: stats.img,
            wins: stats.wins,
            total: stats.total,
            winRate,
          };
        });

        this.chartData.set({
          labels,
          datasets: [{
            label: `Win % (${selectedType.toUpperCase()})`,
            data,
            backgroundColor: colors,
          }],
        });

        this.teamsTable.set(tableData);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching stats', err);
        this.loading.set(false);
      },
    });
  }

  extractWinner(match: any): string {
    if (match.matchWinner && match.matchEnded) {
      return match.matchWinner;
    }
    const status = match.status?.toLowerCase() || '';
    const patterns = ['won by', 'beats', 'beat', 'defeats', 'win'];
    for (const pat of patterns) {
      if (status.includes(pat)) {
        return match.status.split(' ')[0];
      }
    }
    return '';
  }
}