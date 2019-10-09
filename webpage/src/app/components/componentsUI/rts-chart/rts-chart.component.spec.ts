import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtsChartComponent } from './rts-chart.component';

describe('RtsChartComponent', () => {
  let component: RtsChartComponent;
  let fixture: ComponentFixture<RtsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
