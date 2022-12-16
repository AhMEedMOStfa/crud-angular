import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/Auth.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth:AuthService) { }

  login(){
    this.auth.login()
  }
  logout(){
    this.auth.logout()
  }
  ngOnInit() {
  }

}
