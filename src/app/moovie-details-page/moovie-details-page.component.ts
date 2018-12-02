import { AngularFireDatabase } from "angularfire2/database";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MooviesService } from "app/providers/moovies.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../providers/auth.service";
import swal from "sweetalert2";

@Component({
  selector: "app-moovie-details",
  templateUrl: "./moovie-details-page.component.html",
  styleUrls: ["./moovie-details-page.component.css"],
  providers: [MooviesService]
})
export class MoovieDetailsPageComponent implements OnInit {
  localUser = this.authService.getLocalUser();

  public isWatched: boolean = false;

  public starChecked: number = 0;

  public star1Checked: boolean;
  public star2Checked: boolean;
  public star3Checked: boolean;
  public star4Checked: boolean;
  public star5Checked: boolean;

  public clsJaVi = "btn btn-sm btn-white";
  public clsQueroVer = "btn btn-sm btn-white";
  public clsTalvez = "btn btn-sm btn-white";
  public clsNaoMeInteressa = "btn btn-sm btn-white";

  public status: string;

  public searchParam: string;

  public filme = new Object();

  public filmeId;
  public filmeTitulo;
  public filmeAno;
  public filmePoster;
  public filmeSinopse;

  public now = new Date();

  public alert: boolean = false;

  public arraySensacoes = [];

  public arraySensacoesBanco = [];

  public arrayClass = [];

  id: string;
  origem: string;
  private sub: any;

  usuarioId: string;
  fluxo: string;

  public isThereSelection: boolean = false;

  classAvaliacao: string;
  colorAvaliacao: string;
  nomeAvaliacao: string;

  @ViewChild("snackbar") toast: ElementRef;
  @ViewChild("marcarJaVi") jaVi: ElementRef;
  @ViewChild("marcarQueroVer") queroVer: ElementRef;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    public moviesService: MooviesService,
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(qp => {
      this.usuarioId = qp["usuarioId"];
      this.fluxo = qp["fluxo"];
      this.id = qp["id"];
      this.origem = qp["origem"];
      this.searchParam = qp["searchParam"];
    });

    this.filmeId = this.id;

    this.moviesService.getMovieDetails(this.filmeId).subscribe(data => {
      const response = data as any;
      const objeto_retorno = JSON.parse(response._body);
      this.filme = objeto_retorno;

      this.filmeTitulo = objeto_retorno.title;
      this.filmeAno = objeto_retorno.release_date;
      this.filmePoster = objeto_retorno.poster_path;
      this.filmeSinopse = objeto_retorno.overview;
    });

    this.getMoovieService();
  }

  backClicked() {
    if (this.origem) {
      this.router.navigate([this.origem], {
        queryParams: {
          status: this.status,
          searchParam: this.searchParam,
          usuarioId: this.usuarioId,
          fluxo: this.fluxo,
          origem: this.origem
         }
      });
    } else {
      this.router.navigate([""]);
    }
  }

  getMoovieService() {
    this.db
      .object("usuarios/" + this.localUser.user_uid + "/filmes/" + this.filmeId)
      .subscribe(r => {
        if (r.status) {
          this.status = r.status;
          this.isThereSelection = true;

          if (this.status == "1") {
            this.clsJaVi = "btn btn-sm btn-red";
            this.clsQueroVer = "btn btn-sm btn-white";
            this.isWatched = true;
            this.starChecked = r.rate;
            if (this.starChecked == 1) {
              this.star1Checked = true;
            } else if (this.starChecked == 2) {
              this.star2Checked = true;
            } else if (this.starChecked == 3) {
              this.star3Checked = true;
            } else if (this.starChecked == 4) {
              this.star4Checked = true;
            } else if (this.starChecked == 5) {
              this.star5Checked = true;
            }

            if (this.starChecked == 1) {
              this.classAvaliacao = "far fa-tired";
              this.colorAvaliacao = "rgb(248, 120, 66)";
              this.nomeAvaliacao = "Ruim";
            } else if (this.starChecked == 2) {
              this.classAvaliacao = "far fa-meh";
              this.colorAvaliacao = "rgb(255, 141, 34)";
              this.nomeAvaliacao = "Mediano";
            } else if (this.starChecked == 3) {
              this.classAvaliacao = "far fa-smile";
              this.colorAvaliacao = "rgb(224, 193, 12)";
              this.nomeAvaliacao = "Bom";
            } else if (this.starChecked == 4) {
              this.classAvaliacao = "far fa-grin-alt";
              this.colorAvaliacao = "rgb(163, 202, 20)";
              this.nomeAvaliacao = "Muito Bom";
            } else if (this.starChecked == 5) {
              this.classAvaliacao = "far fa-grin-stars";
              this.colorAvaliacao = "rgb(73, 156, 6)";
              this.nomeAvaliacao = "Memorável!";
            }


          } else if (this.status == "2") {
            this.clsJaVi = "btn btn-sm btn-white";
            this.clsQueroVer = "btn btn-sm btn-red";
          }
        } else {
          this.clsJaVi = "btn btn-sm btn-white";
          this.clsQueroVer = "btn btn-sm btn-white";
          this.isWatched = false;
        }
      });
  }

  deleteMoovie() {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: "btn btn-red",
      cancelButtonClass: "btn btn-red",
      buttonsStyling: false
    });

    swalWithBootstrapButtons({
      title: "Limpar a seleção atual e excluir o filme da sua lista?",
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
        this.deleteMoovieService().then(() => {
          swalWithBootstrapButtons(
            "O filme foi excluído de sua lista.",
            "",
            "success"
          );
          this.starChecked = 0;
          this.star2Checked = false;
          this.star3Checked = false;
          this.star4Checked = false;
          this.star5Checked = false;
          this.isThereSelection = false;
          this.getMoovieService();
        });
      }
      // else if (
      //   // Read more about handling dismissals
      //   result.dismiss === swal.DismissReason.cancel
      // ) {
      //   swalWithBootstrapButtons(
      //     'Cancelled',
      //     'Your imaginary file is safe :)',
      //     'error'
      //   )
      // }
    });
  }

  deleteMoovieService() {
    return this.db
      .object("usuarios/" + this.localUser.user_uid + "/filmes/" + this.filmeId)
      .remove();
  }

  dataAtualFormatadaUS(): string {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? "0" + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? "0" + mes : mes,
      anoF = data.getFullYear(),
      hora = data.getHours().toString(),
      horaF = hora.length == 1 ? "0" + hora : hora,
      minuto = data.getMinutes().toString(),
      minutoF = minuto.length == 1 ? "0" + minuto : minuto,
      segundo = data.getSeconds().toString(),
      segundoF = segundo.length == 1 ? "0" + segundo : segundo;
    return (
      anoF +
      "/" +
      mesF +
      "/" +
      diaF +
      " " +
      horaF +
      ":" +
      minutoF +
      ":" +
      segundoF
    );
  }


  updateMoovieService(status) {
    if (status == 1) {
      this.jaVi.nativeElement.innerHTML = "registrando ...";
    } else if (status == 2) {
      this.queroVer.nativeElement.innerHTML = "registrando...";
    }
    let lista = "";

    var marcado = this.dataAtualFormatadaUS();

    this.db
      .object("usuarios/" + this.localUser.user_uid + "/filmes/" + this.filmeId)
      .update({
        id: this.filmeId,
        titulo: this.filmeTitulo,
        lancamento: this.filmeAno,
        poster: this.filmePoster,
        sinopse: this.filmeSinopse,
        marcado: marcado,
        status: status,
        rate: this.starChecked
      })
      .then(r => {
        this.status = status;
        this.isThereSelection = true;
        if (this.status == "1") {
          this.jaVi.nativeElement.innerHTML = "Ja Vi";
          this.clsJaVi = "btn btn-sm btn-red";
          this.clsQueroVer = "btn btn-sm btn-white";
          lista = "Já vi";
          this.isWatched = true;
        } else if (this.status == "2") {
          this.queroVer.nativeElement.innerHTML = "Quero Ver";
          this.clsJaVi = "btn btn-sm btn-white";
          this.clsQueroVer = "btn btn-sm btn-red";
          lista = "Quero ver";
          this.isWatched = false;
          this.starChecked = 0;
          this.star1Checked = false;
          this.star2Checked = false;
          this.star3Checked = false;
          this.star4Checked = false;
          this.star5Checked = false;
          window.location.href = "mymoovies?status=2";
        }
      });
  }

  mostraValor(val) {
    this.starChecked = parseInt(val);
    this.updateMoovieService(1);
  }

  showToast(msg) {
    // Get the snackbar DIV
    var x = this.toast;
    // Add the "show" class to DIV
    x.nativeElement.className = "show";
    x.nativeElement.innerHTML = msg;

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
      x.nativeElement.className = x.nativeElement.className.replace("show", "");
    }, 3000);
  }

  navigate() {
    this.router.navigate(["amigos"], {
      queryParams: {
        filmeId: this.filmeId,
        filmeTitulo: this.filmeTitulo,
        filmeAno: this.filmeAno,
        filmePoster: this.filmePoster,
        colorAvaliacao: this.colorAvaliacao,
        classAvaliacao: this.classAvaliacao,
        nomeAvaliacao: this.nomeAvaliacao,
        origem: "moovie"
      }
    });
  }

}
