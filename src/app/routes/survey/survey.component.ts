import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Survey } from 'src/app/models/survey';
import { User } from 'src/app/models/user';
import { UserValidationService } from 'src/app/services/user/user-validation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  public userExperienceForm: FormGroup;
  private user: User;

  constructor(
    private fb: FormBuilder,
    private us: UserService
  ) {
    this.userExperienceForm = this.initForm();
  }
  
  
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userCredentials')!);
    this.user = user;
  }


  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      nombre: ['', [Validators.required]], 
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      experienciaNavegacion: ['', [Validators.required]],
      comentarios: ['', [Validators.required, Validators.maxLength(150)]],
      puntaje:  ['', Validators.required],
      politicas: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
   
    this.userExperienceForm.markAllAsTouched();

    if(this.userExperienceForm.status === "VALID") {

      const survey = this.userExperienceForm.value as Survey;

      this.us.createSurvey(survey, this.user);
    }
  }
}
