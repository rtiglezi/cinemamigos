import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "app/providers/auth.service";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-painel-page",
  templateUrl: "./painel-page.component.html",
  styleUrls: ["./painel-page.component.css"]
})
export class PainelPageComponent implements OnInit {
  localUser = this.authService.getLocalUser();

  contadorJaVistos = 0;
  contadorQuerVer = 0;
  contadorTalvez = 0;
  contadorDispensa = 0;

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMoovieService();
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
            console.log(m.titulo, this.contadorJaVistos)
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
      });
  }

  navigate(status) {
    this.router.navigate(["mymoovies"], {
      queryParams: { status: status }
    });
  }

}
