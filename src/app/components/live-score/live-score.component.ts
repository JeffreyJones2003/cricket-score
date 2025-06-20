import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CricketService } from '../../services/cricket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-score',
  standalone: true,
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.css'],
  imports: [CommonModule,RouterModule]  
})

export class LiveScoreComponent implements OnInit {
  liveMatches: any[] = [];
  loading = true;

  constructor(private cricketService: CricketService) {}

ngOnInit(): void {
  this.loading = true;

  this.cricketService.getLiveScores().subscribe({
    next: (res: any) => {
      console.log('Live matches:', res.data);
      this.liveMatches = res.data?.slice(0, 8) || []; // limit to 8 matches
      this.loading = false;
    },
    error: (err: any) => {
      console.error('Error loading matches', err);
      this.loading = false;
    }
  });
}
}