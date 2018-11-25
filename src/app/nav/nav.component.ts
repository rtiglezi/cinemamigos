import { AuthService } from "./../providers/auth.service";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MooviesService } from "app/providers/moovies.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
  providers: [MooviesService]
})
export class NavComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
    public moviesService: MooviesService
  ) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  go(pg) {
    this.router.navigate([pg]);
  }

}
