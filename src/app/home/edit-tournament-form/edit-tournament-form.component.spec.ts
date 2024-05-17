import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTournamentFormComponent } from './edit-tournament-form.component';

describe('EditTournamentFormComponent', () => {
  let component: EditTournamentFormComponent;
  let fixture: ComponentFixture<EditTournamentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTournamentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTournamentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
