import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/providers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-switch",
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.css"]
})
export class SwitchComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.authService.af.auth.subscribe(auth => {
      if (auth == null) {
        this.router.navigate(["login"]);
      } else {
        this.router.navigate(["profile"]);
      }
    });

  }

}
