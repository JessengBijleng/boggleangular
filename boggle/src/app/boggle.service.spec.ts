import { TestBed, inject } from '@angular/core/testing';
import { BoggleService } from './boggle.service';

describe('BoggleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoggleService]
    });
  });

  it('should be created', inject([BoggleService], (service: BoggleService) => {
    expect(service).toBeTruthy();
  }));
});
