import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MooviesService } from "app/providers/moovies.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
  providers: [MooviesService]
})
export class FooterComponent implements OnInit {
  arrayMoovies = [];

  colorSugestoes: string;
  colorMyMoovies: string;
  colorBusca: string;
  colorProfile: string;
  colorPainel: string;

  constructor(private router: Router) {}

  ngOnInit() {

    var pathName = window.location.pathname;
    if (pathName=='/sugestoes') {
      this.colorSugestoes = 'orange';
    }
    if (pathName=='/mymoovies') {
      this.colorMyMoovies = 'orange';
    }
    if (pathName=='/busca') {
      this.colorBusca = 'orange';
    }
    if (pathName=='/profile') {
      this.colorProfile = 'orange';
    }
    if (pathName=='/painel') {
      this.colorPainel = 'orange';
    }

  }

  navigate2(destino) {
    this.router.navigate([destino]);
  }

}
