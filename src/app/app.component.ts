import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./providers/auth.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {

  public isLogged: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.af.auth.subscribe(auth => {
      if (auth == null) {
        this.router.navigate(["login"]);
      } else {
        this.isLogged = true;
      }
    });
  }


}
