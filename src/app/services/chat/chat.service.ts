import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private db: AngularFirestore
  ) {}

  public getChat() {
      return this.db
        .collection<Message>('chat')
        .valueChanges()
        .pipe(catchError(this.handleError));
  }

  public addRecord(username:string, message:string) {
    this.db.collection('chat').add({
      username:username,
      message:message,
      date:Date.now().toString()
    }).catch(error => {
      console.log('Login error: ', error);
    });
  }

  handleError(err: HttpErrorResponse) {
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
