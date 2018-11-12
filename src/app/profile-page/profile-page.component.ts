import { AuthService } from './../providers/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  localUser = this.authService.getLocalUser();

  constructor(public authService: AuthService) { }

}
