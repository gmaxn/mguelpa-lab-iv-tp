import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, UserCredentials } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggedEventService } from './logged-event.service';
import { UserChangedEventService } from './user/user-changed-event.service';

@Injectable({
  providedIn: 'root'
})
export class MyAuthenticationService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private _login: LoggedEventService,
    private _userChanged: UserChangedEventService
  ) { }
  
  public async signIn(user: UserCredentials) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(user.username, user.password).then(response => {
        // 1. get user profile info
        this.db.collection<any>("users").doc(response.user?.uid).valueChanges().subscribe(data => {
            // 2. set local storage
            const credentials = {
              uid: data.uid,
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.email,
              roles: data.roles
            };
            localStorage.setItem('userCredentials', JSON.stringify(credentials));
            this._userChanged.emitChange(credentials.username)        
            this._login.emitChange(true);    
            resolve(credentials);
          }
        );
      }).catch(error => {
        reject(error)
      });
    });
  }

  public async signUp(user: User) {
    return new Promise<any>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(user.credentials.username, user.credentials.password).then(response => {
        // 1. persist profile info
        this.db.collection<any>("users").doc(response.user?.uid).set(user.toProfile(response.user?.uid)).then(() => {
          // 2. get last inserted user
          this.db.collection<any>("users").doc(response.user?.uid).valueChanges().subscribe(data => {
            // 3. set local storage
            const credentials = {
              uid: data.uid,
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.email,
              roles: data.roles
            };
            localStorage.setItem('userCredentials', JSON.stringify(credentials));
            this._login.emitChange(true);
            this._userChanged.emitChange(credentials.username)
            resolve(credentials)
          });
        });
      }).catch(error => {
        reject(error)
      });
    });
  }

  public async signOut() {
    this._login.emitChange(false);
    localStorage.removeItem('userCredentials');
    //this.auth.signOut();
    this.router.navigate(['/home']);
  }

  public isLogged() {
    const item = localStorage.getItem('userCredentials');
    return (item !== null) ? true : false;
  }

  public getCurrentUser() {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    return user?.email;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
