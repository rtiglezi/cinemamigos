import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/providers/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2";
import swal from "sweetalert2";

@Component({
  selector: "app-indicacoes-page",
  templateUrl: "./indicacoes-page.component.html",
  styleUrls: ["./indicacoes-page.component.css"]
})
export class IndicacoesPageComponent implements OnInit {
  localUser = this.authService.getLocalUser();

  private sub: any;

  carregando: boolean = false;

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
    if (fluxo == "recebidas") {
      this.btn3Class = "btn btn-dark btn-sm";
      this.btn4Class = "btn btn-danger btn-sm";
      this.fluxo = 'recebidas';
      this.getIndicacoesRecebidas();
    } else if (fluxo == "enviadas") {
      this.btn3Class = "btn btn-danger btn-sm";
      this.btn4Class = "btn btn-dark btn-sm";
      this.fluxo = 'enviadas';
      this.getIndicacoesEnviadas();
    }
  }

  getIndicacoesRecebidas() {
    this.carregando = true;
    this.db
      .list("indicacoes", {
        query: {
          orderByChild: "data"
        }
      })
      .subscribe(r => {
        this.arrayIndicacoes = [];
        r.map(m => {
          if (m.amigoEscolhidoId == this.localUser.user_uid && m.status != 2) {
            this.fluxo = "recebidas";
            this.btn3Class = "btn btn-dark btn-sm";
            this.btn4Class = "btn btn-danger btn-sm";
            this.arrayIndicacoes.push(m);
          }
        });
        this.carregando = false;
      });
  }

  getIndicacoesEnviadas() {
    this.carregando = true;
    this.db
      .list("indicacoes", {
        query: {
          orderByChild: "data"
        }
      })
      .subscribe(r => {
        this.arrayIndicacoes = [];
        r.map(m => {
          if (m.usuarioId == this.localUser.user_uid) {
            this.fluxo = "enviadas";
            this.btn3Class = "btn btn-danger btn-sm";
            this.btn4Class = "btn btn-dark btn-sm";
            this.arrayIndicacoes.push(m);
          }
        });
        this.carregando = false;
      });
  }

  navigate(filmeId, usuarioId, amigoEscolhidoId) {
    if (this.localUser.user_uid == amigoEscolhidoId) {
      this.db
        .object(
          "indicacoes/" + usuarioId + "_" + amigoEscolhidoId + "_" + filmeId
        )
        .update({
          status: 1,
          lidaEm: Date.now()
        })
        .then(r => {});
    }
    this.router.navigate(["moovie"], {
      queryParams: {
        id: filmeId,
        origem: "indicacoes",
        usuarioId: this.usuarioId,
        fluxo: this.fluxo
      }
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
    this.router.navigate(["indicacoes"], {
      queryParams: {
        usuarioId: this.localUser.user_uid,
        fluxo: fluxo,
        origem: "indicacoes"
      }
    });
  }

  confirmarCancelamentoDeIndicacao(filmeId, usuarioId, amigoEscolhidoId) {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: "btn btn-red",
      cancelButtonClass: "btn btn-red",
      buttonsStyling: false
    });

    swalWithBootstrapButtons({
      title: "Deseja realmente cancelar esta indicação?",
      text: "Ela não estará mais disponível também ao destinatário.",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      confirmButtonColor: "red",
      cancelButtonText: "Não",
      buttonsStyling: true,
      reverseButtons: false
    }).then(result => {
      if (result.value) {
        this.cancelarIndicacao(filmeId, usuarioId, amigoEscolhidoId).then(
          () => {
            swalWithBootstrapButtons(
              "Sua indicação foi cancelada com sucesso.",
              "",
              "success"
            );
          }
        );
      }
    });
  }

  cancelarIndicacao(filmeId, usuarioId, amigoEscolhidoId) {
    return this.db
      .object(
        "indicacoes/" + usuarioId + "_" + amigoEscolhidoId + "_" + filmeId
      )
      .remove()
      .then(r => {
        this.getIndicacoes('enviadas');
        window.location.href = `indicacoes?usuarioId=${this.localUser.user_uid}&fluxo=enviadas`;
      });
  }

  confirmarRejeitamentoDeIndicacao(filmeId, usuarioId, amigoEscolhidoId) {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: "btn btn-red",
      cancelButtonClass: "btn btn-red",
      buttonsStyling: false
    });

    swalWithBootstrapButtons({
      title: "Rejeitar essa indicação e excluí-la de sua lista?",
      //text: "O remetente será informado que você rejeitou.",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      confirmButtonColor: "red",
      cancelButtonText: "Cancelar",
      buttonsStyling: true,
      reverseButtons: false
    }).then(result => {
      if (result.value) {
        this.rejeitarIndicacao(filmeId, usuarioId, amigoEscolhidoId).then(
          () => {
            swalWithBootstrapButtons(
              "Essa indicação foi excluída de sua lista.",
              "",
              "success"
            );
          }
        );
      }
    });
  }

  rejeitarIndicacao(filmeId, usuarioId, amigoEscolhidoId) {
    return this.db
      .object(
        "indicacoes/" + usuarioId + "_" + amigoEscolhidoId + "_" + filmeId
      )
      .update({
        status: 2
      })
      .then(r => {
        this.getIndicacoes('recebidas');
        window.location.href = `indicacoes?usuarioId=${this.localUser.user_uid}&fluxo=recebidas`;
      });
  }
}
