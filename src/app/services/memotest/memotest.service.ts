import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Card } from 'src/app/models/card';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlobStorageService } from '../blob-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class MemotestService {

  default = 'https://firebasestorage.googleapis.com/v0/b/mguelpa-lab-iv-tp.appspot.com/o/games%2Fmemotest%2Foctopuss.jpg?alt=media&token=565eaf3b-ec25-43e5-8b6e-e0fcc5b9be1a';

  constructor(
    private db: AngularFirestore,
    private blob: BlobStorageService,
    private storage: AngularFireStorage
  ) { }

  public getCards() {
    return this.db.collection<Card>("games/memotest/cards").valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console.
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}