import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../providers/auth.service";
import { LocalUser } from "../models/local_user";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent {
  constructor(public authService: AuthService, private router: Router) {}

  login() {
    this.authService.loginWithGoogle().then(data => {
      const user: LocalUser = {
        user_uid: data.auth.uid,
        user_displayName: data.auth.displayName,
        user_email: data.auth.email,
        user_photo: data.auth.photoURL
      };
      this.authService.setLocalUser(user);
      this.router.navigate(['']);
    });
  }
}
