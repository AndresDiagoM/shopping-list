import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearListaComprasComponent } from './crear-lista-compras.component';

describe('CrearListaComprasComponent', () => {
  let component: CrearListaComprasComponent;
  let fixture: ComponentFixture<CrearListaComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearListaComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearListaComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
