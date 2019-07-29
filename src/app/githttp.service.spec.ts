import { TestBed } from '@angular/core/testing';

import { GithttpService } from './githttp.service';

describe('GithttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GithttpService = TestBed.get(GithttpService);
    expect(service).toBeTruthy();
  });
});
