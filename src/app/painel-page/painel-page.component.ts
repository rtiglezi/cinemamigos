import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "app/providers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-painel-page",
  templateUrl: "./painel-page.component.html",
  styleUrls: ["./painel-page.component.css"]
})
export class PainelPageComponent implements OnInit {

  localUser = this.authService.getLocalUser();

  contadorJaVistos: any = 0;
  contadorQuerVer: any = 0;
  contadorTalvez: any = 0;
  contadorDispensa: any = 0;

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMoovieService();;
  }

  getMoovieService() {
    this.db
      .list("usuarios/" + this.localUser.user_uid + "/filmes")
      .subscribe(r => {
        this.contadorJaVistos = 0;
        this.contadorQuerVer = 0;
        this.contadorTalvez = 0;
        this.contadorDispensa = 0;

        r.map(m => {
          if (m.status == 1) {
            this.contadorJaVistos++;
          }
          if (m.status == 2) {
            this.contadorQuerVer++;
          }
          if (m.status == 3) {
            this.contadorTalvez++;
          }
          if (m.status == 4) {
            this.contadorDispensa++;
          }

        });

        this.contadorJaVistos = this.contadorJaVistos.toString();
        this.contadorQuerVer = this.contadorQuerVer.toString();
        this.contadorTalvez = this.contadorTalvez.toString();
        this.contadorDispensa = this.contadorDispensa.toString();

      });
  }

  navigate(status) {
    this.router.navigate(["mymoovies"], {
      queryParams: { status: status }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

}
