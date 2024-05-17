import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldTournamentsComponent } from './old-tournaments.component';

describe('OldTournamentsComponent', () => {
  let component: OldTournamentsComponent;
  let fixture: ComponentFixture<OldTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldTournamentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OldTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
