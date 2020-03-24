import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //Método firebase para saber si el usuario está autenticado
    return this.angularFireAuth.authState.pipe(map(auth => {
      if (!!auth) {
        return true
      }
      else {
        //Si el usuairo no está autenticado redirigiremos al login.
        this.router.navigate(['/login']);
        return false;
      }
    }));

  }

}
