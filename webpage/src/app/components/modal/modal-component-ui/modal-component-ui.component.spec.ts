import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponentUIComponent } from './modal-component-ui.component';

describe('ModalComponentUIComponent', () => {
  let component: ModalComponentUIComponent;
  let fixture: ComponentFixture<ModalComponentUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponentUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponentUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
