import { TestBed } from '@angular/core/testing';

import { CompressImgService } from './compress-img.service';

describe('CompressImgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompressImgService = TestBed.get(CompressImgService);
    expect(service).toBeTruthy();
  });
});
