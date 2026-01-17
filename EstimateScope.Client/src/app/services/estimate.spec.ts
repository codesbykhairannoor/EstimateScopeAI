import { TestBed } from '@angular/core/testing';

import { Estimate } from './estimate';

describe('Estimate', () => {
  let service: Estimate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Estimate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
