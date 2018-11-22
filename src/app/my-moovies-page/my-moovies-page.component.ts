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
        this.btn1Class = "btn active btn-sm";
        this.btn2Class = "btn btn-default btn-sm";
      } else if (status == "2") {
        this.search = "Filmes na minha lista para ver";
        this.btn1Class = "btn btn-default btn-sm";
        this.btn2Class = "btn active btn-sm";
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

  navigate(id) {
    this.router.navigate(["moovie"], {
      queryParams: { id: id, origem: "mymoovies" }
    });
  }

  backClicked() {
    window.history.back();
  }

}
