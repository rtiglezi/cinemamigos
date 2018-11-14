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

  contadorJaVistos;
  contadorQuerVer;
  contadorIndicados;
  contadorIndiquei;

  search;


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
        this.contadorIndicados = 0;
        this.contadorIndiquei = 0;

        r.map(m => {
          if (m.status == 1) {
            this.contadorJaVistos++;
          }
          if (m.status == 2) {
            this.contadorQuerVer++;
            this.search = "Filmes que você quer ver!";
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
