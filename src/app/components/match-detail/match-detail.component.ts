import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CricketService } from '../../services/cricket.service';

@Component({
  standalone: true,
  selector: 'app-match-detail',
  imports: [CommonModule],
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})

export class MatchDetailComponent implements OnInit {
  matchId = '';
  match: any = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private cricketService: CricketService
  ) {}

  ngOnInit(): void {
    this.matchId = this.route.snapshot.paramMap.get('id') || '';
    if (this.matchId) {
      this.cricketService.getMatchInfo(this.matchId).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.match = res.data;
          } else {
            this.error = 'Failed to fetch match details.';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error loading match data.';
          this.loading = false;
        }
      });
    }
  }
}