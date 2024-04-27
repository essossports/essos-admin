import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelMatchComponent } from './excel-match.component';

describe('ExcelMatchComponent', () => {
  let component: ExcelMatchComponent;
  let fixture: ComponentFixture<ExcelMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
