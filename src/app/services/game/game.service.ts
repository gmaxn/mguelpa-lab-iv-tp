import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GameInfo } from 'src/app/models/game-info';
import { Player } from 'src/app/models/player';
import { BlobStorageService } from '../blob-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private db: AngularFirestore,
    private blob: BlobStorageService,
    private storage: AngularFireStorage
  ) {}

  public getTitles() {
    return this.db
      .collection<GameInfo>('games')
      .valueChanges()
      .pipe(catchError(this.handleError));
  }

  public getRecords(game:string) {
    return this.db.collection<Player>(`games/${game}/records/`)
      .valueChanges()
      .pipe(catchError(this.handleError));
  }

  public getPlayer(game:string, username:string) {
    return this.db.doc<Player>(`games/${game}/records/${username}`)
      .valueChanges()
      .pipe(catchError(this.handleError));
  }

  public updateRecords(
    game: string,
    username: string,
    uid: string,
    points: number
  ) {
    this.db
      .collection(`games/${game}/records`)
      .doc(username)
      .set({
        uid: uid,
        username: username,
        points: points,
        lastDatePlayed: new Date().toDateString()
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
