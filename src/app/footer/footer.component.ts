import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MooviesService } from "app/providers/moovies.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [MooviesService]
})
export class FooterComponent implements OnInit {

  arrayMoovies = [];

  constructor(
    private router: Router,
    public moviesService: MooviesService
    ) {

    }

  ngOnInit() {
  }

  navigate(destino) {
    this.router.navigate([destino]);
  }

  searchMoovies(query) {
    this.moviesService.getMovies(query).subscribe(data => {
      const response = data as any;
      const objeto_retorno = JSON.parse(response._body);
      console.log(objeto_retorno.results);
      this.arrayMoovies = objeto_retorno.results;
    });
  }

  selectMoovie(id) {
    this.router.navigate(["moovie"], { queryParams: { id: id } });
  }


}
