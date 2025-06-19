import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-team-stats',
  standalone: true,
  imports: [],
  templateUrl: './team-stats.component.html',
  styleUrl: './team-stats.component.css'
})
export class TeamStatsComponent implements OnInit {
  ngOnInit(): void {
    new Chart('teamChart', {
      type: 'bar',
      data: {
        labels: ['India', 'Australia', 'England', 'Pakistan', 'SA'],
        datasets: [{
          label: 'Wins in 2024',
          data: [12, 10, 8, 9, 7],
          backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Team Win Stats' }
        }
      }
    });
  }
}