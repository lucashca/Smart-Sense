import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionComponentsUIComponent } from './selection-components-ui.component';

describe('SelectionComponentsUIComponent', () => {
  let component: SelectionComponentsUIComponent;
  let fixture: ComponentFixture<SelectionComponentsUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionComponentsUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionComponentsUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
