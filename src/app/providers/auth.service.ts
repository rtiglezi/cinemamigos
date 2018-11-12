import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { LocalUser } from '../models/local_user';
import { STORAGE_KEYS } from 'app/config/storage_keys.config';

@Injectable()
export class AuthService {
  constructor(public af: AngularFire) {}

  loginWithGoogle() {
    const login = this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
    return login;
  }

  logout() {
    return this.af.auth.logout();
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUsuer);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUsuer, JSON.stringify(obj));
    }
  }

  getLocalUser(): LocalUser {
    const usr = localStorage.getItem(STORAGE_KEYS.localUsuer);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }
}
