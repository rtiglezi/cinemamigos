import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'app/providers/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-moovies-page',
  templateUrl: './my-moovies-page.component.html',
  styleUrls: ['./my-moovies-page.component.css']
})
export class MyMooviesPageComponent implements OnInit {
  lista_filmes = new Array<any>();
  search: String;

  localUser = this.authService.getLocalUser();

  private sub: any;

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(qp => {
      this.getWatcheds(qp['status']);
      if (qp['status'] == '1') {
        this.search = 'Lista dos filmes que você já viu!';
      } else if (qp['status'] == '2') {
        this.search = 'Lista dos filmes que você quer ver!';
      }
    });
  }

  getWatcheds(status) {
    this.lista_filmes = [];
    this.db
      .list('usuarios/' + this.localUser.user_uid + '/filmes', {
        query: {
          orderByChild: 'marcado',
          limitToLast: 15
        }
      })
      .subscribe(r => {
        r.map(m => {
          if (m.status == status) {
            this.lista_filmes.push(m);
          }
        });
      });
  }

  navigate(id) {
    this.router.navigate(['moovie'], {
      queryParams: { id: id, origem: 'painel' }
    });
  }

  backClicked() {
    this.router.navigate(['']);
  }
}
