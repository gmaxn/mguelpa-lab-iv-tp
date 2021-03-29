import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GameInfo } from 'src/app/models/game-info';
import { BlobStorageService } from '../blob-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private db: AngularFirestore,
    private blob: BlobStorageService,
    private storage: AngularFireStorage
  ) { }
  
  public getTitles() {
    return this.db.collection<GameInfo>("games").valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
