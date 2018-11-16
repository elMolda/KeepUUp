import { Component } from '@angular/core';
import { ViewController, LoadingController, DateTime } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'page-new-subject-modal',
  templateUrl: 'new-subject-modal.html'
})
export class NewSubjectModalPage {

  validations_form: FormGroup;
  loading: any;
  subject_days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

  subject = {
    name: "",
    credits: 0,
    teacher: "",
    day: "",
    hour: "",
  };

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    //this.resetFields()
  }

  /*resetFields(){
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      credits: new FormControl('', Validators.required),
      teacher: new FormControl('', Validators.required)
    });
  }*/

  dismiss() {
   this.viewCtrl.dismiss();
  }

  save() {
    let data = {
      name: this.subject.name,
      credits: Number(this.subject.credits),
      teacher: this.subject.teacher,
      days: this.subject.day,
      hour: String(this.subject.hour)
    }
    this.firebaseService.createSubject(data)
    .then(
      res => {
        //this.resetFields();
        this.viewCtrl.dismiss(this.subject);
      }
    )
  }

  /*onSubmit(value){
    let data = {
      name: value.name,
      credits: Number(value.credits),
      teacher: value.teacher,
      days: this.subject.day
    }
    this.firebaseService.createSubject(data)
    .then(
      res => {
        this.resetFields();
        this.viewCtrl.dismiss();
      }
    )
  }*/
}
