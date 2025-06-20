import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LiveScoreComponent } from './components/live-score/live-score.component';
import { FixturesComponent } from './components/fixtures/fixtures.component';
import { TeamStatsComponent } from './components/team-stats/team-stats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'live-score', pathMatch: 'full' }, // default
  { path: 'live-score', component: LiveScoreComponent },
  { path: 'fixtures', component: FixturesComponent },
  {path: 'team-stats',loadComponent: () => import('./components/team-stats/team-stats.component').then(m => m.TeamStatsComponent)},  { path: 'player-search',loadComponent: () => import('./components/player-search/player-search.component').then(m => m.PlayerSearchComponent)},
  {path: 'match/:id',loadComponent: () => import('./components/match-detail/match-detail.component').then(m => m.MatchDetailComponent)},  { path: '**', redirectTo: 'live-score' } // wildcard for undefined routes
];

export const appConfig = {
  providers: [provideRouter(routes)]
};