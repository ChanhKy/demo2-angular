import { TestBed } from '@angular/core/testing';

import { HesotangcaService } from './hesotangca.service';

describe('HesotangcaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HesotangcaService = TestBed.get(HesotangcaService);
    expect(service).toBeTruthy();
  });
});
