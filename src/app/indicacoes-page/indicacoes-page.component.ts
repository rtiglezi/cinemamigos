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
  private sub: any;

  usuarioId: string;
  fluxo: string;
  origem: string;


  arrayIndicacoesRecebidas = [];

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
    if (fluxo == 'recebidas') {
      this.getIndicacoesRecebidas();
    }
  }

  getIndicacoesRecebidas() {
    this.db
    .list("indicacoes", {query: {
      orderByChild: "amigoEscolhidoId",
      equalTo: this.usuarioId
    }})
    .subscribe(r => {
      this.arrayIndicacoesRecebidas = r;
      console.log(this.arrayIndicacoesRecebidas);
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


}
