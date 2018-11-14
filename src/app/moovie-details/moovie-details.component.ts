import { AngularFireDatabase } from "angularfire2/database";
import { Component, OnInit } from "@angular/core";
import { MooviesService } from "app/providers/moovies.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./../providers/auth.service";

@Component({
  selector: "app-moovie-details",
  templateUrl: "./moovie-details.component.html",
  styleUrls: ["./moovie-details.component.css"],
  providers: [MooviesService]
})
export class MoovieDetailsComponent implements OnInit {

  localUser = this.authService.getLocalUser();

  public clsJaVi           = "btn btn-sm";
  public clsQueroVer       = "btn btn-sm";
  public clsNaoMeInteressa = "btn btn-sm";

  public clsMostrarJaVi           = "";
  public clsMostrarQueroVer       = "";
  public clsMostrarNaoMeInteressa = "";

  public status: string;

  public filme = new Object();
  public filmeid;

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
    });

    this.filmeid = this.id;

    this.moviesService.getMovieDetails(this.filmeid).subscribe(data => {
      const response = data as any;
      const objeto_retorno = JSON.parse(response._body);
      this.filme = objeto_retorno;
    });

    this.getMoovieService();

  }

  backClicked() {
    this.router.navigate([""], { queryParams: { origem: this.origem } });
  }

  getMoovieService() {
    this.db.list("meusFilmes").subscribe(r => {
      r.map(m=>{
        if (m.$key === this.filmeid + "_" + this.localUser.user_uid){
          if (m.filmeId == this.filmeid) {
            this.status = m.status;
          }
          if (this.status == "1") {

            this.clsJaVi           = "btn btn-sm btn-success";
            this.clsQueroVer       = "btn btn-sm";
            this.clsNaoMeInteressa = "btn btn-sm";

            this.clsMostrarJaVi           = "bold";
            this.clsMostrarQueroVer       = "normal";
            this.clsMostrarNaoMeInteressa = "normal";

          } else if (this.status == "2" ) {

            this.clsJaVi           = "btn btn-sm";
            this.clsQueroVer       = "btn btn-sm btn-warning";
            this.clsNaoMeInteressa = "btn btn-sm";

            this.clsMostrarJaVi           = "normal";
            this.clsMostrarQueroVer       = "bold";
            this.clsMostrarNaoMeInteressa = "normal";

          } else if (this.status == "3") {

            this.clsJaVi           = "btn btn-sm";
            this.clsQueroVer       = "btn btn-sm";
            this.clsNaoMeInteressa = "btn btn-sm btn-danger";

            this.clsMostrarJaVi           = "normal";
            this.clsMostrarQueroVer       = "normal";
            this.clsMostrarNaoMeInteressa = "bold";

          }
        }
      });
    });
  }

  updateMoovieService(status) {
    this.db.object("meusFilmes/" + this.filmeid + "_" + this.localUser.user_uid).set({
      filmeId: this.filmeid,
      usuarioId: this.localUser.user_uid,
      status: status
    }).then(r => {
      this.status = status;
      if (this.status == "1") {
        this.clsJaVi           = "btn btn-sm btn-success";
        this.clsQueroVer       = "btn btn-sm";
        this.clsNaoMeInteressa = "btn btn-sm";
      } else if (this.status == "2" ) {
        this.clsJaVi           = "btn btn-sm";
        this.clsQueroVer       = "btn btn-sm btn-warning";
        this.clsNaoMeInteressa = "btn btn-sm";
      } else if (this.status == "3") {
        this.clsJaVi           = "btn btn-sm";
        this.clsQueroVer       = "btn btn-sm";
        this.clsNaoMeInteressa = "btn btn-sm btn-danger";
      }
    });
  }

}
