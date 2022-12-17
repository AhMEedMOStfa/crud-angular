import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //auth depend on local storage
login(){
  localStorage.setItem('isLogin' , 'true');
}
logout(){
  localStorage.setItem('isLogin' , 'false');
}

constructor() { }

}
