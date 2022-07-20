import { AppServiceService } from './services/app-service.service';
import { Component, OnInit } from '@angular/core';
import { Steps } from './models/steps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title!: any;
  
  constructor(private service: AppServiceService) {}

  public ngOnInit(): void {
    this.sortAndSimplifyData();
    this.service.getData1();
  }

  public sortAndSimplifyData(){
    let newSortedArray: any;
    let newSortedArray2: any;
    // it was pretty difficult to access an array of objects from a nested array of objects and to remove it based on comparison.
    // So what i decided to do here might not be the most efficient solution but what it does it it first sorts the versionContent of each data by
    // the effectiveDate. Then i delete every other object except the first one which is the most recent data (recent date).
    // and lastely i sort the data returned by stepNumber value to get the final resulting array that we will be displaying. 
    this.service.getData().subscribe((result) => {
      if(result){
        newSortedArray = result;
        newSortedArray.forEach((item: { versionContent: any[]; }) => item.versionContent.sort((a,b) => a.effectiveDate > b.effectiveDate ? 1 : a.effectiveDate < b.effectiveDate ? -1 : 0));
        
        newSortedArray.forEach((item: { versionContent: string | any[]; }) => item.versionContent = item.versionContent.slice(0,1));
        newSortedArray2 = newSortedArray.sort((a: { stepNumber: number; },b: { stepNumber: number; }) => a.stepNumber > b.stepNumber ? 1 : a.stepNumber < b.stepNumber? -1 : 0);
      }
      this.title = newSortedArray2;
    })
  }
}
