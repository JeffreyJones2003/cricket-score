import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CricketService } from '../../services/cricket.service';


@Component({
  selector: 'app-fixtures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.css'
})
export class FixturesComponent implements OnInit {
  fixtures: any[] = [];
  loading = true;

  private cricketService = inject(CricketService);

  ngOnInit(): void {
    this.cricketService.getUpcomingFixtures().subscribe({
      next: (res: any) => {
        this.fixtures = res.matches?.slice(0, 10) || [];
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to fetch fixtures:', err);
        this.loading = false;
      }
    });
  }
}