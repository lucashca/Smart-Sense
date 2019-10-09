import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraslaterUIComponent } from './traslater-ui.component';

describe('TraslaterUIComponent', () => {
  let component: TraslaterUIComponent;
  let fixture: ComponentFixture<TraslaterUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraslaterUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraslaterUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
