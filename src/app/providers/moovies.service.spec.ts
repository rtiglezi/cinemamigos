/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MooviesService } from './moovies.service';

describe('MooviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MooviesService]
    });
  });

  it('should ...', inject([MooviesService], (service: MooviesService) => {
    expect(service).toBeTruthy();
  }));
});
