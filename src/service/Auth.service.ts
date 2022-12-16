import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLogin:boolean=true;
login(){
  localStorage.setItem('isLogin' , 'true');
}
logout(){
  localStorage.setItem('isLogin' , 'false');
}
isAuthorized():boolean{
  return this.isLogin;
}
constructor() { }

}
