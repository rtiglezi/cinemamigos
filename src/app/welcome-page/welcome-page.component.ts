import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.css"]
})
export class WelcomePageComponent implements OnInit {
  private sub: any;

  primeiroAcesso: boolean;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(qp => {
      if (qp["msg"] == "1") {
        this.primeiroAcesso = true;
      } else if (qp["status"] == "2") {
        this.primeiroAcesso = false;
      }
    });
  }
}
