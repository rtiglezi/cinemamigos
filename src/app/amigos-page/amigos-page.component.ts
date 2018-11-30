import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { AuthService } from 'app/providers/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos-page.component.html',
  styleUrls: ['./amigos-page.component.css']
})
export class AmigosPageComponent implements OnInit {

  localUser = this.authService.getLocalUser();
  lista_amigos = new Array<any>();
  resultado: any;

  arrayAmigos = [];
  @ViewChild("srch") domSearch: ElementRef;
  @ViewChild("srchIcon") domSearchIcon: ElementRef;

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  getAmigos(query) {
    this.arrayAmigos = [];
    this.db
      .list("usuarios", {
        query: {
          orderByChild: "dados/nome"
        }
      })
      .subscribe(r => {
        r.map(m => {
            if (m.dados.nome.toLowerCase().indexOf(query.toLowerCase()) != -1 ) {
              if (query.length > 0) {
                this.arrayAmigos.push(m.dados);
            }}
        });
      });
  }

}
