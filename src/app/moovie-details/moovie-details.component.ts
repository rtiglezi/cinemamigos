import { AngularFireDatabase } from "angularfire2/database";
import { Component, OnInit } from "@angular/core";
import { MooviesService } from "app/providers/moovies.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./../providers/auth.service";
import swal from "sweetalert2";
import { routerNgProbeToken } from "@angular/router/src/router_module";

@Component({
  selector: "app-moovie-details",
  templateUrl: "./moovie-details.component.html",
  styleUrls: ["./moovie-details.component.css"],
  providers: [MooviesService]
})
export class MoovieDetailsComponent implements OnInit {
  localUser = this.authService.getLocalUser();

  public clsJaVi = "btn btn-sm";
  public clsQueroVer = "btn btn-sm";
  public clsNaoMeInteressa = "btn btn-sm";

  public clsMostrarJaVi = "";
  public clsMostrarQueroVer = "";
  public clsMostrarNaoMeInteressa = "";

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

  id: string;
  origem: string;
  private sub: any;

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
      this.router.navigate([this.origem], {queryParams: {status: this.status, searchParam: this.searchParam}});
    } else {
      this.router.navigate([""]);
    }
  }

  getMoovieService() {
    this.db
      .object("usuarios/" + this.localUser.user_uid + "/filmes/" + this.filmeid)
      .subscribe(r => {
        this.status = r.status;

        if (this.status == "1") {
          this.clsJaVi = "btn btn-sm btn-danger";
          this.clsQueroVer = "btn btn-sm";
          this.clsNaoMeInteressa = "btn btn-sm";
          this.clsMostrarJaVi = "bold";
          this.clsMostrarQueroVer = "normal";
          this.clsMostrarNaoMeInteressa = "normal";
        } else if (this.status == "2") {
          this.clsJaVi = "btn btn-sm";
          this.clsQueroVer = "btn btn-sm btn-danger";
          this.clsNaoMeInteressa = "btn btn-sm";
          this.clsMostrarJaVi = "normal";
          this.clsMostrarQueroVer = "bold";
          this.clsMostrarNaoMeInteressa = "normal";
        } else if (this.status == "3") {
          this.clsJaVi = "btn btn-sm";
          this.clsQueroVer = "btn btn-sm";
          this.clsNaoMeInteressa = "btn btn-sm btn-danger";
          this.clsMostrarJaVi = "normal";
          this.clsMostrarQueroVer = "normal";
          this.clsMostrarNaoMeInteressa = "bold";
        }
      });
  }

  updateMoovieService(status) {
    this.db
      .object("usuarios/" + this.localUser.user_uid + "/filmes/" + this.filmeid)
      .update({
        id: this.filmeid,
        titulo: this.filmeTitulo,
        lancamento: this.filmeAno,
        poster: this.filmePoster,
        sinopse: this.filmeSinopse,
        marcado:
          this.now.getDate() +
          "/" +
          (this.now.getMonth() + 1) +
          "/" +
          this.now.getFullYear(),
        status: status
      })
      .then(r => {
        this.status = status;
        if (this.status == "1") {
          this.clsJaVi = "btn btn-sm btn-danger";
          this.clsQueroVer = "btn btn-sm";
          this.clsNaoMeInteressa = "btn btn-sm";
        } else if (this.status == "2") {
          this.clsJaVi = "btn btn-sm";
          this.clsQueroVer = "btn btn-sm btn-danger";
          this.clsNaoMeInteressa = "btn btn-sm";
        } else if (this.status == "3") {
          this.clsJaVi = "btn btn-sm";
          this.clsQueroVer = "btn btn-sm";
          this.clsNaoMeInteressa = "btn btn-sm btn-danger";
        }

        const swalWithBootstrapButtons = swal.mixin({
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
        })

        swal({
          position: 'top',
          type: 'success',
          title: 'Classificação registrada com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });

      });

  }
}
