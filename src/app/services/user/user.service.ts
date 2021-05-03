import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Survey } from 'src/app/models/survey';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFirestore
  ) { }

  async createSurvey(survey: Survey, user: User) {
    return this.uploadSurvey(survey, user);
  }

  async uploadSurvey(survey: Survey, user: User) {
    return this.db.collection(`users/${user.uid}/surveys`).add(survey);
  }

}
