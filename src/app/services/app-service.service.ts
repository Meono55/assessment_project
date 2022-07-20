import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Steps } from '../models/steps';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  apiURL: string = 'https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge'

  constructor(private httpClient: HttpClient) { }

  public getData(): Observable<any[]>{
      return this.httpClient.get<any>(`${this.apiURL}`);
  }
  public getData1(){
    this.httpClient.get<any>(`${this.apiURL}`).subscribe((result) => {
    })
}
}
