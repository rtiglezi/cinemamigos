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

  public starChecked: number = 0;

  public isWatched: boolean = false;

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
        this.status = r.status;

        if (this.status == "1") {
          this.clsJaVi = "btn btn-sm btn-success";
          this.clsQueroVer = "btn btn-sm btn-default";
          this.clsTalvez = "btn btn-sm btn-default";
          this.clsNaoMeInteressa = "btn btn-sm btn-default";
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
          this.clsTalvez = "btn btn-sm btn-default";
          this.clsNaoMeInteressa = "btn btn-sm btn-default";
        } else if (this.status == "3") {
          this.clsJaVi = "btn btn-sm btn-default";
          this.clsQueroVer = "btn btn-sm btn-default";
          this.clsTalvez = "btn btn-sm btn-success";
          this.clsNaoMeInteressa = "btn btn-sm btn-default";
        } else if (this.status == "4") {
          this.clsJaVi = "btn btn-sm btn-default";
          this.clsQueroVer = "btn btn-sm btn-default";
          this.clsTalvez = "btn btn-sm btn-default";
          this.clsNaoMeInteressa = "btn btn-sm btn-success";
        }
      });
  }

  updateMoovieService(status) {
    let lista = "";
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
        status: status,
        rate: this.starChecked
      })
      .then(r => {
        this.status = status;
        if (this.status == "1") {
          this.clsJaVi = "btn btn-sm btn-success";
          this.clsQueroVer = "btn btn-sm btn-default";
          this.clsTalvez = "btn btn-sm btn-default";
          this.clsNaoMeInteressa = "btn btn-sm btn-default";
          lista = "Já vi"
          this.isWatched = true;
        } else if (this.status == "2") {
          this.clsJaVi = "btn btn-sm btn-default";
          this.clsQueroVer = "btn btn-sm btn-success";
          this.clsTalvez = "btn btn-sm btn-default";
          this.clsNaoMeInteressa = "btn btn-sm btn-default";
          lista = "Quero ver"
          this.isWatched = false;
        } else if (this.status == "3") {
          this.clsJaVi = "btn btn-sm btn-default";
          this.clsQueroVer = "btn btn-sm btn-default";
          this.clsTalvez = "btn btn-sm btn-success";
          this.clsNaoMeInteressa = "btn btn-sm btn-default";
          lista = "Talvez veja";
          this.isWatched = false;
        } else if (this.status == "4") {
          this.clsJaVi = "btn btn-sm btn-default";
          this.clsQueroVer = "btn btn-sm btn-default";
          this.clsTalvez = "btn btn-sm btn-default";
          this.clsNaoMeInteressa = "btn btn-sm btn-success";
          lista = "Dispenso";
          this.isWatched = false;
        }

        const swalWithBootstrapButtons = swal.mixin({
          confirmButtonClass: "btn btn-success",
          cancelButtonClass: "btn btn-success",
          buttonsStyling: false
        });

        // swal({
        //   position: "top",
        //   type: "success",
        //   title: "Filme inserido lista: " + lista,
        //   showConfirmButton: false,
        //   timer: 2000
        // });

      });
  }

  mostraValor(val) {
    this.starChecked = parseInt(val);
    this.updateMoovieService(1);
  }

}
