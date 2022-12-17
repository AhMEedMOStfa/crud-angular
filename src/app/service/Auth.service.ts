import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
login(){
  localStorage.setItem('isLogin' , 'true');
}
logout(){
  localStorage.setItem('isLogin' , 'false');
}

constructor() { }

}
