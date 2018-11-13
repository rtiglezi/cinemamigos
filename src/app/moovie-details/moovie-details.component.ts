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

  public classSim = "";
  public classNao = "";

  public assistido: boolean = false;

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
    this.db.list("watchedMoovies").subscribe(r => {
      r.map(m=>{
        if (m.$key === this.filmeid + "_" + this.localUser.user_uid){
          if (m.assistido == true) {
            this.assistido = true;
          }
          if (this.assistido) {
            this.classSim = "btn btn-sm btn-danger";
            this.classNao = "btn btn-sm btn-default";
          } else {
            this.classNao = "btn btn-sm btn-danger";
            this.classSim = "btn btn-sm btn-default";
          }
        }
      });
    });
  }

  updateMoovieService(toogle) {
    this.db.object("watchedMoovies/" + this.filmeid + "_" + this.localUser.user_uid).set({
      filmeId: this.filmeid,
      usuarioId: this.localUser.user_uid,
      assistido: toogle
    }).then(r => {
      this.assistido = toogle;
      if (this.assistido) {
        this.classSim = "btn btn-sm btn-danger";
        this.classNao = "btn btn-sm btn-default";
      } else {
        this.classNao = "btn btn-sm btn-danger";
        this.classSim = "btn btn-sm btn-default";
      }
    });
  }

}
