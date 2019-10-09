import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User("","");

  constructor(public authService:AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.user);
  }

}
