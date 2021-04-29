import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Card } from 'src/app/models/card';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlobStorageService } from '../blob-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class MemotestService {

  public base64Image: any;
  default = 'https://firebasestorage.googleapis.com/v0/b/mguelpa-lab-iv-tp.appspot.com/o/games%2Fmemotest%2Foctopuss.jpg?alt=media&token=565eaf3b-ec25-43e5-8b6e-e0fcc5b9be1a';

  set: Card[] = [];



  constructor(
    private db: AngularFirestore,
    private blob: BlobStorageService,
    private storage: AngularFireStorage
  ) {

  }


  public async getImages() {
    return new Promise<any>((resolve, reject) => {
      this.getCards().subscribe(set => {
        let i = 0;
        set.map(item => {
          i++;
          let seed = Math.floor(Math.random() * 250)+i;
          let imageUrl = `https://picsum.photos/id/${seed}/125/125`;
          
          this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
            item.base64 = `data:image/jpg;base64,${base64data}`;
            item.uid = seed;
          });
        })
        resolve(set);
      });
    })
  }

  private getCards() {
    return this.db.collection<Card>("games/memotest/cards").valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public get() {
    return this.set;
  }




  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/jpg");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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