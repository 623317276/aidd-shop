import { TestBed } from '@angular/core/testing';

import { AreaJsonService } from './area-json.service';

describe('AreaJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaJsonService = TestBed.get(AreaJsonService);
    expect(service).toBeTruthy();
  });
});
