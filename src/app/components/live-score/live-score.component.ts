import { Component, OnInit } from '@angular/core';
import { CricketService } from '../../services/cricket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-score',
  standalone: true,
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.css'],
  imports: [CommonModule]  
})

export class LiveScoreComponent implements OnInit {
  liveMatches: any[] = [];
  loading = true;

  constructor(private cricketService: CricketService) {}

  ngOnInit(): void {
    this.cricketService.getLiveScores().subscribe({
      next: (res: any) => {
        this.liveMatches = res?.data?.filter((m: any) => m?.status?.toLowerCase() === 'live') || [];
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching live scores:', err);
        this.loading = false;
      }
    });
  }

  getTeamFlag(teamName: string): string {
    const flags: { [key: string]: string } = {
      India: 'https://flagcdn.com/in.svg',
      Australia: 'https://flagcdn.com/au.svg',
      England: 'https://flagcdn.com/gb.svg',
      Pakistan: 'https://flagcdn.com/pk.svg',
      'South Africa': 'https://flagcdn.com/za.svg',
      'Sri Lanka': 'https://flagcdn.com/lk.svg',
      'New Zealand': 'https://flagcdn.com/nz.svg',
      Bangladesh: 'https://flagcdn.com/bd.svg',
      Afghanistan: 'https://flagcdn.com/af.svg',
      'West Indies': 'https://flagcdn.com/jm.svg'
    };
    return flags[teamName] || 'https://via.placeholder.com/30x20';
  }
}