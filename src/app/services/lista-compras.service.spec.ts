import { TestBed } from '@angular/core/testing';

import { ListaComprasService } from './lista-compras.service';

describe('ListaComprasService', () => {
  let service: ListaComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
