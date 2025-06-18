import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStatsComponent } from './team-stats.component';

describe('TeamStatsComponent', () => {
  let component: TeamStatsComponent;
  let fixture: ComponentFixture<TeamStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
