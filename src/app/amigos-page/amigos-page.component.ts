import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AngularFireDatabase } from "angularfire2";
import { AuthService } from "app/providers/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: "app-amigos",
  templateUrl: "./amigos-page.component.html",
  styleUrls: ["./amigos-page.component.css"]
})
export class AmigosPageComponent implements OnInit {
  localUser = this.authService.getLocalUser();
  lista_amigos = new Array<any>();
  resultado: any;

  filmeId: string;
  filmeTitulo: string;
  filmeAno: string;
  filmePoster: string;
  origem: string;
  private sub: any;

  classAvaliacao: string;
  colorAvaliacao: string;
  nomeAvaliacao: string;

  amigoEscolhido: boolean = false;

  amigoEscolhidoId: string;
  amigoEscolhidoNome: string;
  amigoEscolhidoEmail: string;
  amigoEscolhidoFoto: string;

  arrayAmigos = [];
  @ViewChild("srch") domSearch: ElementRef;
  @ViewChild("srchIcon") domSearchIcon: ElementRef;

  @ViewChild("btnEnviar") domBtnEnviar: ElementRef;
  @ViewChild("btnFechar") domBtnFechar: ElementRef;

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(qp => {
      this.filmeId = qp["filmeId"];
      this.filmeTitulo = qp["filmeTitulo"];
      this.filmeAno = qp["filmeAno"];
      this.filmePoster = qp["filmePoster"];
      this.origem = qp["origem"];
      this.classAvaliacao = qp["classAvaliacao"];
      this.colorAvaliacao = qp["colorAvaliacao"];
      this.nomeAvaliacao = qp["nomeAvaliacao"];
    });
  }

  getAmigos(query) {
    this.arrayAmigos = [];
    this.db
      .list("usuarios", {
        query: {
          orderByChild: "dados/nome"
        }
      })
      .subscribe(r => {
        r.map(m => {
          if (m.dados.nome.toLowerCase().indexOf(query.toLowerCase()) != -1) {
            if (query.length > 0) {
              if (!m.dados.privado) {
                this.arrayAmigos.push(m.dados);
                this.amigoEscolhido = false;
              }
            }
          }
        });
      });
  }

  mostraBoxIndicacao(
    amigoEscolhidoId,
    amigoEscolhidoNome,
    amigoEscolhidoEmail,
    amigoEscolhidoFoto
  ) {
    this.arrayAmigos = null;
    this.amigoEscolhido = true;
    this.amigoEscolhidoId = amigoEscolhidoId;
    this.amigoEscolhidoNome = amigoEscolhidoNome;
    this.amigoEscolhidoEmail = amigoEscolhidoEmail;
    this.amigoEscolhidoFoto = amigoEscolhidoFoto;
  }

  confirmarEnvioIndicacao(msg) {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: "btn btn-red",
      cancelButtonClass: "btn btn-red",
      buttonsStyling: false
    });

    swalWithBootstrapButtons({
      title: "Enviar esta indicação agora?",
      //text: "Este filme será excluído de sua lista.",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      confirmButtonColor: "red",
      cancelButtonText: "Cancelar",
      buttonsStyling: true,
      reverseButtons: false
    }).then(result => {
      if (result.value) {
        this.enviarIndicacao(msg).then(() => {
          swalWithBootstrapButtons(
            "Sua indicação foi enviada com sucesso.",
            "",
            "success"
          );
          this.navigate();
        });
      }
    });
  }

  enviarIndicacao(msg) {
    this.domBtnEnviar.nativeElement.innerHTML = "enviando ...";

    return this.db
      .object(
        "indicacoes/" +
          this.localUser.user_uid +
          "_" +
          this.amigoEscolhidoId +
          "_" +
          this.filmeId
      )
      .set({
        data: Date.now(),
        usuarioId: this.localUser.user_uid,
        usuarioNome: this.localUser.user_displayName,
        usuarioEmail: this.localUser.user_email,
        usuarioFoto: this.localUser.user_photo,
        amigoEscolhidoId: this.amigoEscolhidoId,
        amigoEscolhidoNome: this.amigoEscolhidoNome,
        amigoEscolhidoEmail: this.amigoEscolhidoEmail,
        amigoEscolhidoFoto: this.amigoEscolhidoFoto,
        filmeId: this.filmeId,
        filmeTitulo: this.filmeTitulo,
        filmeAno: this.filmeAno,
        filmePoster: this.filmePoster,
        mensagem: msg,
        lida: false
      })
      .then(r => {
        this.domBtnEnviar.nativeElement.innerHTML =
          "Indicação enviada (Editar)";
        this.domBtnFechar.nativeElement.style.display = "";
      });
  }

  navigate() {
    this.router.navigate(["profile"]);
  }

  backClicked() {
    if (this.origem) {
      this.router.navigate([this.origem]);
    }
  }

}
