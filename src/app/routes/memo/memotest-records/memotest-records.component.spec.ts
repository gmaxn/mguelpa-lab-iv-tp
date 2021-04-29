import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemotestRecordsComponent } from './memotest-records.component';

describe('MemotestRecordsComponent', () => {
  let component: MemotestRecordsComponent;
  let fixture: ComponentFixture<MemotestRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemotestRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemotestRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
