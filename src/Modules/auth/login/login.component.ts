import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { audit } from 'rxjs';
import { AuthService } from 'src/service/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder , private auth:AuthService , private router:Router) { }
  loginForm:FormGroup = this.fb.group({
    email:['',[Validators.required , Validators.email , Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    password:['' , [Validators.required]],
  })
  
  submitForm(){
    if(this.loginForm.valid)
    {
      this.router.navigate(['/Home']);
      this.auth.login();
    }
  }

  ngOnInit(): void {
  }

}
