import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "app/providers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-switch",
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.css"]
})
export class SwitchComponent implements OnInit {
  localUser = this.authService.getLocalUser();

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.af.auth.subscribe(auth => {
      if (auth == null) {
        this.router.navigate(["login"]);
      } else {
        this.getMoovieService();
      }
    });
  }

  ngOnInit() {}

  getMoovieService() {
    this.db
      .list("usuarios/" + this.authService.getLocalUser().user_uid + "/filmes")
      .subscribe(r => {
        if (r.length == 0) {
          this.router.navigate(["welcome"], {
            queryParams: { msg: "1" }
          });
        } else {
          this.router.navigate(["welcome"], {
            queryParams: { msg: "2" }
          });
        }
      });
  }
}
