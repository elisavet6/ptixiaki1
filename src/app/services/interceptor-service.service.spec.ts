import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor-service.service';

describe('InterceptorServiceService', () => {
  let service: InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
