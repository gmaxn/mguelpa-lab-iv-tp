import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BlobFile } from '../models/blob-flile';

@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  public async uploadFile(file: BlobFile) {

    return new Promise<any>((resolve, reject) => {

      const storageRef = this.storage.ref(file.filename);

      const uploadTask = storageRef.put(file.stream, { contentType: file.contentType });

      uploadTask.task.on('state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        function error(err) {
          console.log('error', err);
          reject();
        },
        function complete() {
          uploadTask.task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        });
    });
  }

  public async deleteFileByUrl(fileUrl: string) {
    try {
      this.storage.storage.refFromURL(fileUrl).delete();
    }
    catch(e) {
      alert(e);
    }
  }
}