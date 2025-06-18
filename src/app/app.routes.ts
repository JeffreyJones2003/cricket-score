import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LiveScoreComponent } from './components/live-score/live-score.component';
import { FixturesComponent } from './components/fixtures/fixtures.component';
import { TeamStatsComponent } from './components/team-stats/team-stats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'live-score', pathMatch: 'full' }, // default
  { path: 'live-score', component: LiveScoreComponent },
  { path: 'fixtures', component: FixturesComponent },
  { path: 'team-stats', component: TeamStatsComponent },
  { path: '**', redirectTo: 'live-score' } // wildcard for undefined routes
];

export const appConfig = {
  providers: [provideRouter(routes)]
};