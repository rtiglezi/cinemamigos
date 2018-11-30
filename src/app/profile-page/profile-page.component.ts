import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "app/providers/auth.service";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.css"]
})
export class ProfilePageComponent implements OnInit {

  localUser = this.authService.getLocalUser();
  resultado: any;
  lista_filmes = new Array<any>();
  primeiroAceso: string;

  classAvaliacao: string;
  colorAvaliacao: string;
  nomeAvaliacao: string;

  contadorJaVistos: any = 0;
  contadorQuerVer: any = 0;
  contadorTalvez: any = 0;
  contadorDispensa: any = 0;


  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {}


  ngOnInit() {
      this.getLastWatched(1);
      this.getCreation();
      this.getMoovieService();
  }

  getCreation() {
    this.db.object("usuarios/" + this.localUser.user_uid + "/dados").subscribe(r=> {
      this.primeiroAceso = r.primeiroAcesso;
    })
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


  getLastWatched(status) {
    this.db
      .list("usuarios/" + this.localUser.user_uid + "/filmes", {
        query: {
          orderByChild: "marcado"
        }
      })
      .subscribe(r => {
        r.map(m => {
          if (m.status == status) {
            this.lista_filmes = [];
            this.lista_filmes.push(m);
            this.resultado = this.lista_filmes.length;
            if (m.rate == 1) {
              this.classAvaliacao = "far fa-tired";
              this.colorAvaliacao = "rgb(248, 120, 66)";
              this.nomeAvaliacao = "Ruim";
            } else if (m.rate == 2) {
              this.classAvaliacao = "far fa-meh";
              this.colorAvaliacao = "rgb(255, 141, 34)";
              this.nomeAvaliacao = "Mediano";
            } else if (m.rate == 3) {
              this.classAvaliacao = "far fa-smile";
              this.colorAvaliacao = "rgb(224, 193, 12)";
              this.nomeAvaliacao = "Bom";
            } else if (m.rate == 4) {
              this.classAvaliacao = "far fa-grin-alt";
              this.colorAvaliacao = "rgb(163, 202, 20)";
              this.nomeAvaliacao = "Muito Bom";
            } else if (m.rate == 5) {
              this.classAvaliacao = "far fa-grin-stars";
              this.colorAvaliacao = "rgb(73, 156, 6)";
              this.nomeAvaliacao = "Memorável!";
            }
          }
          if (this.lista_filmes.length == 0) {
            this.resultado = "0";
          }
        });
      });
  }

    logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  navigate(destino) {
    this.router.navigate([destino]);
  }
}
