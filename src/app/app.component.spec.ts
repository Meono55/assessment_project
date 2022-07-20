import { AppServiceService } from './services/app-service.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Steps } from './models/steps';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let service: AppServiceService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule,
      ],
      declarations: [

      ],
      providers: [AppServiceService, AppComponent]
    }).compileComponents();

    component = TestBed.inject(AppComponent);
    service = TestBed.inject(AppServiceService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call the sortAndSimplyData function', () => {
        spyOn(component, 'sortAndSimplifyData');
        component.ngOnInit();
        expect(component.sortAndSimplifyData).toHaveBeenCalled();
    })
  });
  describe('sortAndSimplifyData', () => {
    it('should call the getData service function', () => {
      let mockData: Steps[] = [
        {id: '123', stepNumber: '3', versionContent: [{title: '', body: '', effectiveDate: ''}]},
        {id: '1234', stepNumber: '2', versionContent: [{title: '', body: '', effectiveDate: ''}]},
        {id: '1235', stepNumber: '4', versionContent: [{title: '', body: '', effectiveDate: ''}]},
        {id: '1236', stepNumber: '1', versionContent: [{title: '', body: '', effectiveDate: ''}]},
      ]
      spyOn(service, 'getData').and.returnValue(of(mockData));
      component.sortAndSimplifyData();
      expect(service.getData).toHaveBeenCalled();
    });
    it('should return the data sorted by stepNumber in ascending order', () => {
      let mockData: Steps[] = [
        {id: '123', stepNumber: '3', versionContent: [{title: '', body: '', effectiveDate: ''}]},
        {id: '1234', stepNumber: '2', versionContent: [{title: '', body: '', effectiveDate: ''}]},
        {id: '1235', stepNumber: '4', versionContent: [{title: '', body: '', effectiveDate: ''}]},
        {id: '1236', stepNumber: '1', versionContent: [{title: '', body: '', effectiveDate: ''}]},
      ]

      const sortedMockData: Steps[] = [
        {id: '1236', stepNumber: '1', versionContent: [{title: '', body: '', effectiveDate: ''}]},
        {id: '1234', stepNumber: '2', versionContent: [{title: '', body: '', effectiveDate: ''}]},
        {id: '123', stepNumber: '3', versionContent: [{title: '', body: '', effectiveDate: ''}]},
        {id: '1235', stepNumber: '4', versionContent: [{title: '', body: '', effectiveDate: ''}]},
      ]
      
      spyOn(service, 'getData').and.returnValue(of(mockData));
      component.sortAndSimplifyData();
      expect(component.title).toEqual(sortedMockData);
      
    })
  })
});
