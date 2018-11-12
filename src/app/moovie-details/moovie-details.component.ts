
import { Component, OnInit } from '@angular/core';

import { MooviesService } from "app/providers/moovies.service";

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: "app-moovie-details",
  templateUrl: "./moovie-details.component.html",
  styleUrls: ["./moovie-details.component.css"],
  providers: [MooviesService]
})
export class MoovieDetailsComponent implements OnInit {

  public filme = new Object();
  public filmeid;

  id: string;
  origem: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    public moviesService: MooviesService,
    private router: Router
  ) {

    }

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
      // console.log(this.filme);
    });
  }

  backClicked() {
    this.router.navigate([''], { queryParams: { "origem": this.origem } });
  }

}
