import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Record } from './../../models/record';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  dblist: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.dblist = this.firestore.collection<Record>('records');
  }

  getRecordsObservable(): Observable<Record[]> {
    return this.dblist.valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  getRecordsDoc(): Record[] {
    let arr: Record[];
    this.dblist.get().toPromise().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        arr.push({
          uid: doc.ref.id,
          game: doc.data().game,
          points: doc.data().points,
          username: doc.data().username
        });
      });
      return arr;
    });
    return [];
  }

  setRecordsDoc(record: Record) {
    let arr: Record[];
    this.dblist.doc(record.uid).set({
      uid: record.uid,
      game: record.game,
      username: record.username,
      points: record.points
    });
  }

  addRecordDoc(record: Record) {
    let arr: Record[];
    this.dblist.add({
      uid: record.uid,
      game: record.game,
      username: record.username,
      points: record.points
    }).then(docRef => {
      this.dblist.doc(docRef.id).set({
        docRefId: docRef.id,
        game: record.game,
        username: record.username,
        points: record.points
      }).catch(error => {
        console.error('Error adding document: ', error);
      });
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