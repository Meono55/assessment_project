import { VersionContent } from './../models/versionContent';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Steps } from '../models/steps';

import { AppServiceService } from './app-service.service';

describe('AppServiceService', () => {
  let service: AppServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppServiceService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AppServiceService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getData() and return expected object', () => {
    const mockVersionContent: VersionContent = {
      title: 'Hello',
      body: 'this is a mock testing',
      effectiveDate: '12/12/2022'
    }
    const mockResult: Steps[] = [
      {id: '1',
      stepNumber: '1',
      versionContent: [mockVersionContent]
    
      }
    ]

    service.getData().subscribe((res) => {
      expect(res).toEqual(mockResult);
    });

    const req = httpMock.expectOne('https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge');
    expect(req.request.method).toEqual("GET");
    req.flush(mockResult);

    httpMock.verify();
  })
});
