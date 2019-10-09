import { Injectable, EventEmitter } from "@angular/core";
import { User } from "../class/user";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isAuth = false;

  authEmiter = new EventEmitter<Boolean>();

  private loginURL = "http://localhost:3000/login";

  constructor(private router: Router,private http:HttpClient) {}

  login2(user: User) {
    if (user.name === "lucas" && user.password === "senha") {
      this.isAuth = true;
      this.authEmiter.emit(true);
      this.router.navigate(["/"]);
    } else {
      this.isAuth = false;
      this.authEmiter.emit(false);
    }
  }

  isAuthenticated() {
    return this.isAuth;
  }

  login(user:User){
    this.http.post(this.loginURL,user).subscribe((res)=>{
      this.authEmiter.emit(true);
      this.router.navigate(['/']);
      this.isAuth = true;
    });
  }
}
