
import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/providers/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2";

@Component({
  selector: "app-indicacoes-page",
  templateUrl: "./indicacoes-page.component.html",
  styleUrls: ["./indicacoes-page.component.css"]
})
export class IndicacoesPageComponent implements OnInit {

  localUser = this.authService.getLocalUser();

  private sub: any;

  usuarioId: string;
  fluxo: string;
  origem: string;

  btn1Class = "btn btn-dark btn-sm";
  btn2Class = "btn btn-dark btn-sm";
  btn3Class = "btn btn-dark btn-sm";
  btn4Class = "btn btn-dark btn-sm";


  arrayIndicacoes = [];

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(qp => {
      this.usuarioId = qp["usuarioId"];
      this.fluxo = qp["fluxo"];
      this.origem = qp["origem"];

    });
    this.getIndicacoes(this.fluxo);

  }

  getIndicacoes(fluxo) {
    console.log(fluxo);
    if (fluxo == 'recebidas') {
      this.getIndicacoesRecebidas();
    } else if (fluxo == 'enviadas') {
      this.getIndicacoesEnviadas();
    }
  }

  getIndicacoesRecebidas() {
    this.arrayIndicacoes=[];
    this.db
    .list("indicacoes", {query: {
      orderByChild: "data"
    }})
    .subscribe(r => {
      r.map(m=>{
        if (m.amigoEscolhidoId == this.localUser.user_uid ) {
          this.fluxo = 'recebidas';
          this.btn3Class = "btn btn-dark btn-sm";
          this.btn4Class = "btn btn-danger btn-sm";
          this.arrayIndicacoes.push(m);
        }
      });
    });
  }

  getIndicacoesEnviadas() {
    this.arrayIndicacoes=[];
    this.db
    .list("indicacoes", {query: {
      orderByChild: "data"
    }})
    .subscribe(r => {
      r.map(m=>{
        if (m.usuarioId == this.localUser.user_uid ) {
          this.fluxo = 'enviadas';
          this.btn3Class = "btn btn-danger btn-sm";
          this.btn4Class = "btn btn-dark btn-sm";
          this.arrayIndicacoes.push(m);
        }
      });
    });
  }

  navigate(filmeId, usuarioId, amigoEscolhidoId) {

    this.db
    .object("indicacoes/" + usuarioId + "_" + amigoEscolhidoId + "_" + filmeId)
    .update({
        lida: true
     }).then(r=>{
      this.router.navigate(["moovie"], {
        queryParams: { id: filmeId, origem: "indicacoes", usuarioId: this.usuarioId, fluxo: this.fluxo }
      });
     });
  }

  backClicked() {
    if (this.origem) {
      this.router.navigate([this.origem], {
        queryParams: {
          usuarioId: this.usuarioId,
          fluxo: this.fluxo,
          origem: this.origem
         }
      });
    } else {
      this.router.navigate([""]);
    }
  }

  go(status) {
    this.router.navigate(["mymoovies"], {
      queryParams: { status: status }
    });
  }

  goIndicacoes(fluxo) {
    this.getIndicacoes(fluxo);
  }


}
