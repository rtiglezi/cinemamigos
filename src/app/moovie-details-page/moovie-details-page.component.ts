import { NavComponent } from './../nav/nav.component';
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

  public clsJaVi = "btn btn-sm btn-default";
  public clsQueroVer = "btn btn-sm btn-default";
  public clsTalvez = "btn btn-sm btn-default";
  public clsNaoMeInteressa = "btn btn-sm btn-default";

  public status: string;

  public searchParam: string;

  public filme = new Object();

  public filmeid;
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

  public isThereSelection: boolean = false;

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
      this.id = qp["id"];
      this.origem = qp["origem"];
      this.searchParam = qp["searchParam"];
    });

    this.filmeid = this.id;

    this.moviesService.getMovieDetails(this.filmeid).subscribe(data => {
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
        queryParams: { status: this.status, searchParam: this.searchParam }
      });
    } else {
      this.router.navigate([""]);
    }
  }

  getMoovieService() {
    this.db
      .object("usuarios/" + this.localUser.user_uid + "/filmes/" + this.filmeid)
      .subscribe(r => {
        if (r.status) {
          this.status = r.status;
          this.isThereSelection = true;

          if (this.status == "1") {
            this.clsJaVi = "btn btn-sm btn-success";
            this.clsQueroVer = "btn btn-sm btn-default";
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
          } else if (this.status == "2") {
            this.clsJaVi = "btn btn-sm btn-default";
            this.clsQueroVer = "btn btn-sm btn-success";
          }
        } else {
          this.clsJaVi = "btn btn-sm btn-default";
          this.clsQueroVer = "btn btn-sm btn-default";
          this.isWatched = false;
        }
      });
  }

  deleteMoovie() {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
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
      .object("usuarios/" + this.localUser.user_uid + "/filmes/" + this.filmeid)
      .remove();
  }

  updateMoovieService(status) {
    if (status == 1) {
      this.jaVi.nativeElement.innerHTML = "registrando ...";
    } else if (status ==2 ) {
      this.queroVer.nativeElement.innerHTML = "registrando...";
    }
    let lista = "";

    var dia = (this.now.getDate() < 10) ? '0' + this.now.getDate() : this.now.getDate();
    var mes = ((this.now.getMonth() + 1) < 10) ? '0' + this.now.getMonth() : this.now.getMonth();
    var ano = this.now.getFullYear();

    var hora = (this.now.getHours() < 10) ? '0' + this.now.getHours() : this.now.getHours();
    var minuto = (this.now.getMinutes() < 10) ? '0' + this.now.getMinutes() : this.now.getMinutes();
    var segundo = (this.now.getSeconds() < 10) ? '0' + this.now.getSeconds() : this.now.getSeconds();

    var marcado = ano + "/" + mes + "/" + dia + " " + hora + ":" + minuto + ":" + segundo;

    this.db
      .object("usuarios/" + this.localUser.user_uid + "/filmes/" + this.filmeid)
      .update({
        id: this.filmeid,
        titulo: this.filmeTitulo,
        lancamento: this.filmeAno,
        poster: this.filmePoster,
        sinopse: this.filmeSinopse,
        marcado: marcado,
        status: status,
        rate: this.starChecked
      })
      .then(r => {
        // const swalWithBootstrapButtons = swal.mixin({
        //   confirmButtonClass: "btn btn-success",
        //   cancelButtonClass: "btn btn-success",
        //   buttonsStyling: false
        // });

        // swal({
        //   position: "top",
        //   type: "success",
        //   title: "Informação registrada!",
        //   showConfirmButton: false,
        //   timer: 2000
        // });

        // this.showToast('Informação registrada.');

        this.status = status;
        this.isThereSelection = true;
        if (this.status == "1") {
          this.jaVi.nativeElement.innerHTML = "Ja Vi";
          this.clsJaVi = "btn btn-sm btn-success";
          this.clsQueroVer = "btn btn-sm btn-default";
          lista = "Já vi";
          this.isWatched = true;
        } else if (this.status == "2") {
          this.queroVer.nativeElement.innerHTML = "Quero Ver";
          this.clsJaVi = "btn btn-sm btn-default";
          this.clsQueroVer = "btn btn-sm btn-success";
          lista = "Quero ver";
          this.isWatched = false;
          this.starChecked = 0;
          this.star1Checked = false;
          this.star2Checked = false;
          this.star3Checked = false;
          this.star4Checked = false;
          this.star5Checked = false;
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
}
