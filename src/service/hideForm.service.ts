import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HideFormService {
  ishide:boolean = true;
  isShown:boolean = false;
}
