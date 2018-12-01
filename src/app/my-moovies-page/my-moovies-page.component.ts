import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "app/providers/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-my-moovies-page",
  templateUrl: "./my-moovies-page.component.html",
  styleUrls: ["./my-moovies-page.component.css"]
})
export class MyMooviesPageComponent implements OnInit {
  lista_filmes = new Array<any>();

  searchParam: String;

  public search: String;

  btn1Class;
  btn2Class;
  btn3Class = "btn btn-dark btn-sm";
  btn4Class = "btn btn-dark btn-sm";

  resultado: any;

  localUser = this.authService.getLocalUser();

  status: string;

  private sub: any;

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(status = "1") {
    this.sub = this.route.queryParams.subscribe(qp => {
      if (qp["status"]) {
        status = qp["status"];
      }
      this.getWatcheds(status);
      if (status == "1") {
        this.search = "Filmes na minha lista dos já vistos";
        this.btn1Class = "btn btn-danger btn-sm";
        this.btn2Class = "btn btn-dark btn-sm";
      } else if (status == "2") {
        this.search = "Filmes na minha lista para ver";
        this.btn1Class = "btn btn-dark btn-sm";
        this.btn2Class = "btn btn-danger btn-sm";
      }
      this.status = status;
      this.searchParam = qp["searchParam"];
    });
  }

  getWatcheds(status) {
    this.lista_filmes = [];
    this.db
      .list("usuarios/" + this.localUser.user_uid + "/filmes", {
        query: {
          orderByChild: "marcado"
        }
      })
      .subscribe(r => {
        r.map(m => {
          if (m.status == status) {
            this.lista_filmes.push(m);
            this.resultado = this.lista_filmes.length;
          }
          if (this.lista_filmes.length == 0) {
            this.resultado = "0";
          }
        });
      });
  }

  go(status) {
    this.router.navigate(["mymoovies"], {
      queryParams: { status: status }
    });
  }

  goIndicacoes(fluxo) {
    this.router.navigate(["indicacoes"], {
      queryParams: {
        usuarioId: this.localUser.user_uid,
        fluxo: fluxo,
        origem: "profile"
      }
    });
  }

  indicar(filmeId) {

    this.db
        .object("usuarios/" + this.localUser.user_uid + "/filmes/" + filmeId)
        .subscribe(r => {

          let classAvaliacao: string;
          let colorAvaliacao: string;
          let nomeAvaliacao: string;
          let starChecked: number;

          starChecked = r.rate;

          if (starChecked == 1) {
            classAvaliacao = "far fa-tired";
            colorAvaliacao = "rgb(248, 120, 66)";
            nomeAvaliacao = "Ruim";
          } else if (starChecked == 2) {
            classAvaliacao = "far fa-meh";
            colorAvaliacao = "rgb(255, 141, 34)";
            nomeAvaliacao = "Mediano";
          } else if (starChecked == 3) {
            classAvaliacao = "far fa-smile";
            colorAvaliacao = "rgb(224, 193, 12)";
            nomeAvaliacao = "Bom";
          } else if (starChecked == 4) {
            classAvaliacao = "far fa-grin-alt";
            colorAvaliacao = "rgb(163, 202, 20)";
            nomeAvaliacao = "Muito Bom";
          } else if (starChecked == 5) {
            classAvaliacao = "far fa-grin-stars";
            colorAvaliacao = "rgb(73, 156, 6)";
            nomeAvaliacao = "Memorável!";
          }

          this.router.navigate(["amigos"], {
            queryParams: {
              filmeId: filmeId,
              filmeTitulo: r.titulo,
              filmeAno: r.lancamento,
              filmePoster: r.poster,
              colorAvaliacao: colorAvaliacao,
              classAvaliacao: classAvaliacao,
              nomeAvaliacao: nomeAvaliacao,
              origem: "mymoovies" }
          });

        });
  }

  navigate(id) {
    this.router.navigate(["moovie"], {
      queryParams: { id: id, origem: "mymoovies" }
    });
  }

  backClicked() {
    window.history.back();
  }

}
