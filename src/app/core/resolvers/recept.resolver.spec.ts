import { TestBed } from '@angular/core/testing';

import { ReceptResolver } from './recept.resolver';

describe('ReceptResolver', () => {
  let resolver: ReceptResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ReceptResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
