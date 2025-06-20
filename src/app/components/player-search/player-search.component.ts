import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CricketService } from '../../services/cricket.service';

@Component({
  selector: 'app-player-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent {
  keyword = '';
  players: any[] = [];
  loading = false;

  constructor(private cricketService: CricketService) {}

search(): void {
  if (!this.keyword.trim()) return;

  this.loading = true;
  this.cricketService.searchPlayers(this.keyword).subscribe({
  next: (res) => {
    console.log('Player search result:', res);  // ✅ log it
    this.players = res.data || [];
    this.loading = false;
  },
  error: (err) => {
    console.error('Search error:', err);
    this.loading = false;
  }
});
}

selectedPlayer: any = null; // Store selected player info

selectPlayer(player: any): void {
  this.loading = true;

  this.cricketService.getPlayerInfo(player.id).subscribe({
    next: (res) => {
      this.selectedPlayer = {
        ...res.data,
        groupedStats: this.groupStatsByMatchType(res.data.stats || [])
      };
      this.loading = false;
    },
    error: (err) => {
      console.error('Player Info Error:', err);
      this.loading = false;
    }
  });
}

groupStatsByMatchType(stats: any[]): { [key: string]: any[] } {
  const grouped: { [key: string]: any[] } = {};
  stats.forEach(stat => {
    const matchType = stat.matchtype?.trim();
    if (!grouped[matchType]) {
      grouped[matchType] = [];
    }
    grouped[matchType].push({
      fn: stat.fn?.trim(),
      stat: stat.stat?.trim(),
      value: stat.value?.trim()
    });
  });
  return grouped;
}

objectKeys = Object.keys;
}