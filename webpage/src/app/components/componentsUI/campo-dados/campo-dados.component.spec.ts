import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoDadosComponent } from './campo-dados.component';

describe('CampoDadosComponent', () => {
  let component: CampoDadosComponent;
  let fixture: ComponentFixture<CampoDadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoDadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
