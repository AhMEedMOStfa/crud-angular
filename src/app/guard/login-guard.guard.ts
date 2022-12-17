import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/service/Auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router:Router , private auth:AuthService){

  }
  canActivate(): boolean {
      if(localStorage.getItem('isLogin')==='true'){
        return true
      }
      else{
        this.router.navigate(['auth/Login'])
        return false;
      }
  }
  
}
