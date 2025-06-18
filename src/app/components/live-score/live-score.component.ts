import { Component, OnInit } from '@angular/core';
import { CricketService } from '../../services/cricket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-score',
  standalone: true,
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.css'],
  imports: [CommonModule]  // ✅ Add this line
})
export class LiveScoreComponent implements OnInit {
  liveMatches: any[] = [];
  loading = true;

  constructor(private cricketService: CricketService) {}

  getTeamFlag(teamName: string): string {
  const flagMap: { [key: string]: string } = {
    'India': 'https://flagcdn.com/w40/in.png',
    'Australia': 'https://flagcdn.com/w40/au.png',
    'England': 'https://flagcdn.com/w40/gb.png',
    'Pakistan': 'https://flagcdn.com/w40/pk.png',
    'South Africa': 'https://flagcdn.com/w40/za.png',
    'Sri Lanka': 'https://flagcdn.com/w40/lk.png',
    'New Zealand': 'https://flagcdn.com/w40/nz.png',
    'Bangladesh': 'https://flagcdn.com/w40/bd.png',
    'Afghanistan': 'https://flagcdn.com/w40/af.png',
    'West Indies': 'https://flagcdn.com/w40/jm.png'
  };

  return flagMap[teamName] || 'https://flagcdn.com/w40/un.png'; // fallback image
}



  // ngOnInit(): void {
  //   this.cricketService.getLiveScores().subscribe({
  //     next: (data: any) => {
  //       this.liveMatches = data.data || [];
  //       this.loading = false;
  //     },
  //     error: (err: any) => {
  //       console.error('Failed to load live scores', err);
  //       this.loading = false;
  //     }
  //   });
  // }


ngOnInit() {
  this.cricketService.getLiveScores().subscribe({
    next: (res) => {
      this.liveMatches = res?.data || [];
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching scores:', err);
      this.loading = false;
    }
  });
}
}