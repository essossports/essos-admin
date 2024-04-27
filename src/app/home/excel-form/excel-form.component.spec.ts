import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelFormComponent } from './excel-form.component';

describe('ExcelFormComponent', () => {
  let component: ExcelFormComponent;
  let fixture: ComponentFixture<ExcelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
