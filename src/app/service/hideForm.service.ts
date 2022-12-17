import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideFormService {
  //this behavior subject to control hide open Employee form
  public ishide:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(){
    this.ishide.next(this.ishide.value);
  }
}
